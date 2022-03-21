package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.repository.ImageRepository;
import com.it4409.socialnetwork.service.serviceinterface.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    ImageRepository imageRepository;

    @Override
    public Image save(String fileName) {
        Image rs = imageRepository.save(new Image(0, fileName, "/api/public/image/content/"+fileName));
        return rs;
    }
}
