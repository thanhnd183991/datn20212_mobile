package com.it4409.socialnetwork.controller;

import com.it4409.socialnetwork.dto.ProfileDTO;
import com.it4409.socialnetwork.entities.Form.ProfileForm;
import com.it4409.socialnetwork.service.JWTService;
import com.it4409.socialnetwork.service.serviceinterface.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/private/profile")
public class ProfileController {
    private JWTService jwtService;
    private ProfileService profileService;

    @GetMapping("/{username}")
    public ResponseEntity<Object> getProfile(@RequestHeader("Authorization")String token, @PathVariable("username")String usernameOfProfile) {
        String username = jwtService.decode(token);
        ProfileDTO profile = profileService.getProfile(username, usernameOfProfile);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/edit")
    public ResponseEntity<Object> getUpdateProfile(@RequestHeader("Authorization")String token) {
        String username = jwtService.decode(token);
        return ResponseEntity.ok(profileService.getUserInformation(username));
    }

    @PostMapping("/edit")
    public ResponseEntity<Object> updateProfile(@RequestHeader("Authorization")String token, @RequestBody ProfileForm profileForm) {
        String username = jwtService.decode(token);
        System.out.println("name: " + profileForm.getName());
        if (profileService.updateProfile(profileForm, username)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/edit/avatar/{imageId}")
    public ResponseEntity<Object> updateProfileImage(@RequestHeader("Authorization")String token, @PathVariable("imageId")Integer imageId) {
        String username = jwtService.decode(token);
        if (profileService.updateProfileImage(username, imageId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
