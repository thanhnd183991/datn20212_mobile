package com.it4409.socialnetwork.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.it4409.socialnetwork.entities.Comment;
import com.it4409.socialnetwork.entities.Image;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class PostDTO {
    private Integer id;
    private Date postingDate;
    private Integer numberOfComments;

    private Integer numberOfHearts;

    private Integer numberOfImages;

    private UserDTO userDTO;

    private List<Image> images;
    private List<UserDTO> reactionUserDTOs;

    private List<Comment> comments;
    private String content;

    public PostDTO(){}

    public PostDTO(Post post) {
        this.id = post.getId();
        this.postingDate = post.getPostingDate();
        this.numberOfComments = post.getNumberOfComments();
        this.numberOfHearts = post.getNumberOfHearts();
        this.numberOfImages = post.getNumberOfImages();
        this.userDTO = new UserDTO(post.getUser());
        this.images = post.getImages();
        this.comments = post.getComments();
        this.content = post.getContent();
    }
}
