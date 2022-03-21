package com.it4409.socialnetwork.dto;

import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private Integer userId;
    private String name;
    private String userName;
    private Image profileImage;
    private List<PostDTO> postDTOs;
    private Integer relationShip;

    public ProfileDTO(User user, List<Post> posts) {
        this.userName = user.getUsername();
        this.userId = user.getId();
        this.name = user.getName();
        this.profileImage = user.getProfile_Image();
        this.postDTOs = new ArrayList<>();
        for (Post post : posts) {
            this.postDTOs.add(new PostDTO(post));
        }
    }
}
