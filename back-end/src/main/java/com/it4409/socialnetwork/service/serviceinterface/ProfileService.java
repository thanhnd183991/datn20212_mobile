package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.dto.ProfileDTO;
import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.ProfileForm;
import com.it4409.socialnetwork.entities.Form.RegisterForm;
import com.it4409.socialnetwork.entities.User;

public interface ProfileService {
    public ProfileDTO getProfile(String username, String usernameOfProfile );
    public UserDTO getUserInformation(String username);
    public boolean updateProfile(ProfileForm profileForm, String username);
    public boolean updateProfileImage(String username, Integer imageId);
}
