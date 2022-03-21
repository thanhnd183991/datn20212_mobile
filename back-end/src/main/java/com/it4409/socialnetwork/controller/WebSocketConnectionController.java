package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.utils.ActiveUserManager;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@RestController("api/private/websocket")
@AllArgsConstructor
public class WebSocketConnectionController {
    private ActiveUserManager activeSessionManager;
    private JWTService jwtService;

    @PostMapping("/user-connect")
    public ResponseEntity<Object> userConnect(HttpServletRequest request,
                              @RequestHeader("Authorization") String token) {
        String username = jwtService.decode(token);
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("Remote_Addr");
            if (StringUtils.isEmpty(remoteAddr)) {
                remoteAddr = request.getHeader("X-FORWARDED-FOR");
                if (remoteAddr == null || "".equals(remoteAddr)) {
                    remoteAddr = request.getRemoteAddr();
                }
            }
        }
        activeSessionManager.add(username, remoteAddr);
        return ResponseEntity.ok(username);
    }

    @PostMapping("/user-disconnect")
    public ResponseEntity<Object> userDisconnect(@RequestHeader("Authorization") String token) {
        String username = jwtService.decode(token);
        activeSessionManager.remove(username);
        return ResponseEntity.ok("disconnected");
    }

    @GetMapping("/active-friends-of/{username}")
    public ResponseEntity<Object> getActiveFriendsOfCurrentUser(@PathVariable(name = "username") String username){
        return ResponseEntity.ok(activeSessionManager.getActiveFriendsOfCurrentUser(username));
    }

}
