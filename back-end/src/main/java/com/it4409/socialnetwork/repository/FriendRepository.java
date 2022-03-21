package com.it4409.socialnetwork.repository;

import com.it4409.socialnetwork.entities.Friend;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.entities.key.FriendKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, FriendKey> {

    List<Friend> findByUser1(User user1);
    boolean existsByUser1AndUser2(User user1, User user2);
}
