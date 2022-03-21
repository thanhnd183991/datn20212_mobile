package com.it4409.socialnetwork.dto;

import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String name;
    private Image profile_Image;
    private String username;
    private String email;
    private Date dateOfBirth;
    private String address;

    public UserDTO(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.profile_Image = user.getProfile_Image();
    }
}
