package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.entities.Form.CommentForm;
import com.it4409.socialnetwork.entities.Form.PostForm;
import com.it4409.socialnetwork.entities.Post;

import java.util.List;

public interface PostService {
    Post getPostbyId(String username, Integer postId);

    Post submitPost(String username, PostForm postForm);

    Post commentPost(String username, CommentForm commentForm);

    Post reactPost(String username, Integer postId);

    List<Post> searchPost(String username, String keyword);
}
