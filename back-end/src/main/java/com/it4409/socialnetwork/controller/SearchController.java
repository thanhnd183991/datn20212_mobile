package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.PostService;
import com.it4409.socialnetwork.service.serviceinterface.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("api/private/search")
public class SearchController {
    private JWTService jwtService;
    private UserService userService;
    private PostService postService;

    @GetMapping(value = "/user/{keyword}")
    public ResponseEntity<Object> searchUser(@RequestHeader("Authorization") String token,
                                             @PathVariable String keyword){
        String username = jwtService.decode(token);
        System.out.println("Key word: " + keyword);
        List<User> list= userService.searchUser(username, keyword);
        return ResponseEntity.ok(list);
    }

    @GetMapping(value = "/post/{keyword}")
    public ResponseEntity<Object> searchPost(@RequestHeader("Authorization") String token,
                                             @PathVariable String keyword){
        String username = jwtService.decode(token);
        List<Post> list= postService.searchPost(username, keyword);
        return ResponseEntity.ok(list);
    }
}
