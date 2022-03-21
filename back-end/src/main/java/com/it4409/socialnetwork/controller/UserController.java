package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.LoginForm;
import com.it4409.socialnetwork.entities.Form.RegisterForm;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/public/user")
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginForm loginForm){
        try{
            loginForm.setUsername(loginForm.getUsername().toLowerCase());
            boolean rs = userService.login(loginForm);
            if(rs){
                return ResponseEntity.ok(jwtService.generateToken(loginForm.getUsername()));
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterForm registerForm){
        try {
            registerForm.setUsername(registerForm.getUsername().toLowerCase());
            boolean rs = userService.register(registerForm);
            if(rs){
                return ResponseEntity.ok(jwtService.generateToken(registerForm.getUsername()));
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e);
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<Object> getUserInfo(@PathVariable(name = "username") String username){
        UserDTO rs = userService.getUserById(username);
        return ResponseEntity.ok(rs);
    }

}
