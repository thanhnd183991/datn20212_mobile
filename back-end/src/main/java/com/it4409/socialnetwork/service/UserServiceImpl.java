package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.LoginForm;
import com.it4409.socialnetwork.entities.Form.RegisterForm;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.repository.ImageRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.UserService;
import com.it4409.socialnetwork.utils.EncodeUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public boolean login(LoginForm loginForm) {
        return userRepository.existsByUsernameAndPassword(loginForm.getUsername(), EncodeUtil.getSHA256(loginForm.getPassword()));
    }

    @Override
    public boolean register(RegisterForm registerForm) throws Exception {
        boolean existed = userRepository.existsByUsername(registerForm.getUsername());
        if (!existed) {
            User user = User.builder()
                    .username(registerForm.getUsername())
                    .password(EncodeUtil.getSHA256(registerForm.getPassword()))
                    .email(registerForm.getEmail())
                    .name(registerForm.getName())
                    .joiningDate(new Date())
                    .numberOfFriends(0)
                    .numberOfImages(0)
                    .numberOfPosts(0)
                    .validatedEmail(Boolean.FALSE)
                    .profile_Image(imageRepository.findById(new Integer(1)).get())
                    .build();
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public List<User> searchUser(String username, String keyword) {

        boolean check = userRepository.existsByUsername(username);
        if (!check) {
            return null;
        }else {
            List<User> users = new ArrayList<>();
            users = userRepository.findUser(keyword, username);
            users.forEach(user -> {
                user.setPassword(null);
            });
            return users;
        }
    }

    public UserDTO getUserById(String username){
        User user = userRepository.findByUsername(username);
        return new UserDTO(user);
    }
}
