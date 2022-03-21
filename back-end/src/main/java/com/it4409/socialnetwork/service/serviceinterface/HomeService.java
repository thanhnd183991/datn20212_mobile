package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.entities.Post;

import java.util.List;

public interface HomeService {

    public List<Post> loadPosts(String username);
}
