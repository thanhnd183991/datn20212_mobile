package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.dto.FriendState;
import com.it4409.socialnetwork.dto.RequestFriendDTO;
import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.ReplyRequestFriendForm;
import com.it4409.socialnetwork.entities.Friend;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.FriendService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/private/friend")
public class FriendController {

    private JWTService jwtService;
    private FriendService friendService;

    @GetMapping(value = "/list")
    public ResponseEntity<Object> getListFriend(@RequestHeader("Authorization") String token) {
        String username = jwtService.decode(token);
        List<UserDTO> rs= friendService.getListFriend(username);
        return ResponseEntity.ok(rs);
    }

    @GetMapping(value = "/request-list")
    public ResponseEntity<Object> getRequestFriendList(@RequestHeader("Authorization") String token) {
        String username = jwtService.decode(token);
        List<RequestFriendDTO> rs = friendService.getListRequestFriend(username);
        return ResponseEntity.ok(rs);
    }

    @GetMapping(value = "/state/{username}")
    public ResponseEntity<Object> getFriendState(@RequestHeader("Authorization") String token, @PathVariable(value = "username", required = true) String username2){
        String username1 = jwtService.decode(token);
        FriendState rs = friendService.getFriendState(username1, username2);
        if(rs != null){
            return ResponseEntity.ok(rs);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    // gui loi moi ket ban
    @PostMapping(value = "/request/{receiverUsername}")
    public ResponseEntity<Object> sendRequest(@RequestHeader("Authorization") String token, @PathVariable(value = "receiverUsername", required = true) String receiverUsername) {
        String username = jwtService.decode(token);
        boolean rs = friendService.sendRequestFriend(username, receiverUsername);
        if (rs) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }


    // phan hoi loi moi ket ban
    @PutMapping(value = "/request")
    public ResponseEntity<Object> replyRequest(@RequestHeader("Authorization") String token, @RequestBody ReplyRequestFriendForm form) {
        String username = jwtService.decode(token);
        boolean rs = friendService.replyRequestFriend(username, form);
        if (rs) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
