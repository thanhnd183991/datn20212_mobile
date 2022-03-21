package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.HomeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/private")
public class HomeController {
    private HomeService homeService;
    private JWTService jwtService;

    @GetMapping("/home-page")
    public ResponseEntity<Object> loadHomePage(@RequestHeader("Authorization") String token){
        String username = jwtService.decode(token);
        List<Post> rs = homeService.loadPosts(username);
        return ResponseEntity.ok(rs);
    }
}
