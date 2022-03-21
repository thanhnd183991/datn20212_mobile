package com.it4409.socialnetwork.repository;

import com.it4409.socialnetwork.entities.Post;
import com.it4409.socialnetwork.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser(User user);

    Post findPostById(Integer id);

    @Query("SELECT p from Post p where p.content like %?1%")
    List<Post> findPostByContent(String content);
}
