package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.entities.Comment;
import com.it4409.socialnetwork.entities.Form.CommentForm;
import com.it4409.socialnetwork.entities.Form.PostForm;
import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.repository.CommentRepository;
import com.it4409.socialnetwork.repository.PostRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {
    private UserRepository userRepository;
    private PostRepository postRepository;
    private CommentRepository commentRepository;

    @Override
    public Post getPostbyId(String username, Integer postId) {
        boolean check = userRepository.existsByUsername(username);
        Post post;
        if (check) {
            post = postRepository.findPostById(postId);
            return deletePassword(post);
        } else {
            return null;
        }
    }

    @Override
    public Post submitPost(String username, PostForm postForm) {
        System.out.println(username);
        User user = userRepository.findByUsername(username);
        Post post = new Post();
        post.setContent(postForm.getContent());
        post.setImages(postForm.getImageList());
        post.setPostingDate(new Date());
        post.setNumberOfHearts(0);
        post.setNumberOfImages(0);
        post.setNumberOfComments(0);
        user.setNumberOfPosts(user.getNumberOfPosts() + 1 );
        user.setNumberOfImages(user.getNumberOfImages() + postForm.getImageList().size());
        post.setUser(user);
        Post rs =  postRepository.save(post);

        return deletePassword(rs);
    }

    @Override
    public Post commentPost(String username, CommentForm commentForm) {
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findPostById(commentForm.getPostId());
        post.setNumberOfComments(post.getNumberOfComments() + 1);
        Comment comment = new Comment();
        comment.setContent(commentForm.getContent());
        comment.setPost(post);
        comment.setUser(user);
        comment.setPostingDate(new Date());

        commentRepository.save(comment);
        return deletePassword(postRepository.save(post));
    }



    @Override
    public Post reactPost(String username, Integer postId) {
        User user = userRepository.findByUsername(username);
        Post post = postRepository.findPostById(postId);
        if (post.getReactionUsers().contains(user)){
            post.getReactionUsers().remove(user);
            post.setNumberOfHearts(post.getNumberOfHearts() - 1);
        }
        else {
            post.getReactionUsers().add(user);
            post.setNumberOfHearts(post.getNumberOfHearts() + 1);
        }
        return deletePassword(postRepository.save(post));
    }

    @Override
    public List<Post> searchPost(String username, String keyword) {
        boolean check = userRepository.existsByUsername(username);
        if (!check) {
            return null;
        }else {
            List<Post> posts = new ArrayList<>();
            posts = postRepository.findPostByContent(keyword);
            posts.forEach(post -> {
                deletePassword(post);
            });
            return posts;
        }
    }

    private Post deletePassword(Post post){
        if (post.getUser() != null){
            post.getUser().setPassword(null);
        }
        if (post.getReactionUsers() != null){
            for (int i = 0; i < post.getReactionUsers().size() - 1; i++) {
                post.getReactionUsers().get(i).setPassword(null);
            }
        }
        return post;
    }
}
