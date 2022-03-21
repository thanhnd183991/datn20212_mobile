package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.LoginForm;
import com.it4409.socialnetwork.entities.Form.RegisterForm;
import com.it4409.socialnetwork.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

public interface UserService {
    public boolean login(LoginForm loginForm);
    public boolean register(RegisterForm registerForm) throws Exception;

    List<User> searchUser(String username, String keyword);
    UserDTO getUserById(String username);
}
