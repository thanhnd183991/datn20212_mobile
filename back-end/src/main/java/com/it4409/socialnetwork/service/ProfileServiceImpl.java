package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.dto.ProfileDTO;
import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.ProfileForm;
import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.repository.FriendRepository;
import com.it4409.socialnetwork.repository.ImageRepository;
import com.it4409.socialnetwork.repository.PostRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.ImageService;
import com.it4409.socialnetwork.service.serviceinterface.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private UserRepository userRepository;
    private PostRepository postRepository;
    private FriendRepository friendRepository;
    private ImageRepository imageRepository;
    private ImageService imageService;

    @Override
    public ProfileDTO getProfile(String username, String usernameOfProfile) {
        User requestUser = userRepository.findByUsername(usernameOfProfile);
        List<Post> posts = postRepository.findByUser(requestUser);

        User user = userRepository.findByUsername(username);
        ProfileDTO profileDTO = new ProfileDTO(requestUser, posts);

        if (user.equals(requestUser)) {
            profileDTO.setRelationShip(0);
        } else if (friendRepository.existsByUser1AndUser2(user, requestUser)) {
            profileDTO.setRelationShip(1);
        } else {
            profileDTO.setRelationShip(2);
        }
        return profileDTO;
    }

    @Override
    public UserDTO getUserInformation(String username) {
        User user = userRepository.findByUsername(username);
        UserDTO userDTO = new UserDTO(user);
        userDTO.setUsername(user.getUsername());
        userDTO.setAddress(user.getAddress());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setEmail(user.getEmail());

        return userDTO;
    }

    @Override
    public boolean updateProfile(ProfileForm profileForm, String username) {
        try {
            User user = userRepository.findByUsername(username);
            user.setName(profileForm.getName());
            user.setEmail(profileForm.getEmail());

            if(profileForm.getDateOfBirth().equals("")){
                user.setDateOfBirth(null);
            }else{
                Date dateOfBirth = new SimpleDateFormat("yyyy-MM-dd").parse(profileForm.getDateOfBirth());
                user.setDateOfBirth(dateOfBirth);
            }
            user.setAddress(profileForm.getAddress());
            userRepository.save(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean updateProfileImage(String username, Integer imageId) {
        User user = userRepository.findByUsername(username);
        Image image = imageRepository.findById(imageId).orElse(null);

        if (image != null) {
            user.setProfile_Image(image);
            userRepository.save(user);
            return true;
        } else {
            return false;
        }

    }
}
