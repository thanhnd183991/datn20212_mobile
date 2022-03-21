package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@AllArgsConstructor
@RequestMapping("api/private/message")
public class MessageController {
    private JWTService jwtService;

    private MessageService messageService;
    @GetMapping(value = "/{username}")
    public ResponseEntity<Object> getAllMessages(@RequestHeader("Authorization") String token,
                                                 @PathVariable(value = "username") String username){
        String currentUsername = jwtService.decode(token);
        if(!currentUsername.equals(username)){
            return ResponseEntity.ok(messageService.getAllMessages(currentUsername, username));
        }else{
            return ResponseEntity.badRequest().build();
        }

    }

}
