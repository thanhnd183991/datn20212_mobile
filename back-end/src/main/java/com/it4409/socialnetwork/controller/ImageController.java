package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.service.serviceinterface.ImageService;
import com.it4409.socialnetwork.utils.EncodeUtil;
import com.it4409.socialnetwork.utils.MediaTypeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@RestController
@RequestMapping("api/public/image")
public class ImageController {
    @Autowired
    ImageService imageService;

    @Value("${image.upload.location}")
    public String location;

    @Autowired
    private ServletContext servletContext;

    @PostMapping("/upload")
    public ResponseEntity<Object> upload(@RequestParam("file") MultipartFile file){
        Path folder = Paths.get(location);
        String fileName =  EncodeUtil.getSHA256(new Date().getTime() + file.getOriginalFilename()) + file.getOriginalFilename();

        try {
            Files.copy(file.getInputStream(), folder.resolve(fileName));
            Image rs = imageService.save(fileName);
            return ResponseEntity.ok(rs);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(e);
        }
    }

    @GetMapping("/content/{filename}")
    public ResponseEntity<Object> download(@PathVariable(value = "filename", required = false) String fileName) {
        MediaType mediaType = MediaTypeUtils.getMediaTypeForFileName(this.servletContext, fileName);
        File file = new File(location + "/" + fileName);
        InputStreamResource resource = null;
        try {
            resource = new InputStreamResource(new FileInputStream(file));
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .contentLength(file.length())
                    .body(resource);
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(500).body(e);
        }
    }
}
