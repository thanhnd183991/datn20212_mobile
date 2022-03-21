package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.entities.Friend;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.repository.FriendRepository;
import com.it4409.socialnetwork.repository.PostRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.HomeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class HomeServiceImpl implements HomeService {

    FriendRepository friendRepository;
    PostRepository postRepository;
    UserRepository userRepository;

    @Override
    public List<Post> loadPosts(String username) {
        List<Post> posts = new ArrayList<>();
        User user = userRepository.findByUsername(username);
        List<Friend> friendList = friendRepository.findByUser1(user);
        for(int i = 0; i < friendList.size(); i++){
            User friend = friendList.get(i).getUser2();
            List<Post> temps = postRepository.findByUser(friend);
            for(int j = 0; j < temps.size(); j++){
                temps.get(j).getUser().setPassword(null);
            }
            posts.addAll(temps);
        }
        List<Post> temps = postRepository.findByUser(user);
        for(int j = 0; j < temps.size(); j++){
            temps.get(j).getUser().setPassword(null);
        }
        posts.addAll(temps);
        posts.sort(new Comparator<Post>() {
            @Override
            public int compare(Post o1, Post o2) {
                return o2.getPostingDate().compareTo(o1.getPostingDate());
            }
        });
        return posts;
    }
}
