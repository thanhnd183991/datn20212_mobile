package com.it4409.socialnetwork.entities.Form;

import com.it4409.socialnetwork.entities.Image;
import lombok.Data;

import java.util.List;

@Data
public class PostForm {
    private String content;
    List<Image> imageList;
}
