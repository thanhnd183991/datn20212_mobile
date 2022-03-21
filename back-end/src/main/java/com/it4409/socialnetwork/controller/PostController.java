package com.it4409.socialnetwork.controller;


import com.it4409.socialnetwork.entities.Comment;
import com.it4409.socialnetwork.entities.Form.CommentForm;
import com.it4409.socialnetwork.entities.Form.PostForm;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/private")
public class PostController {

    private JWTService jwtService;
    private PostService postService;

    @GetMapping(value = "/post/{postId}")
    public ResponseEntity<Object> getPostById(@RequestHeader("Authorization") String token,
                                              @PathVariable Integer postId){
        String username = jwtService.decode(token);
        Post post = postService.getPostbyId(username,postId);

        return ResponseEntity.ok(post);
    }

    @PostMapping(value = "/post/submit")
    public ResponseEntity<Object> submitPost(@RequestHeader("Authorization") String token,
                                             @RequestBody PostForm postForm){
        String username = jwtService.decode(token);
        Post post = postService.submitPost(username, postForm);
        return ResponseEntity.ok(post);
    }

    @PostMapping(value = "/post/comment")
    public ResponseEntity<Object> commentPost(@RequestHeader("Authorization") String token,
                                              @RequestBody CommentForm commentForm){
        String username = jwtService.decode(token);
        Post post = postService.commentPost(username, commentForm);
        return ResponseEntity.ok(post);
    }
    @PostMapping(value = "/post/react/{postId}")
    public ResponseEntity<Object> reactPost(@RequestHeader("Authorization") String token,
                                             @PathVariable Integer postId){
        String username = jwtService.decode(token);
        Post post = postService.reactPost(username, postId);
        return ResponseEntity.ok(post);
    }

}
