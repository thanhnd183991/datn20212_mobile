package com.it4409.socialnetwork.repository;

import com.it4409.socialnetwork.entities.RequestFriend;
import com.it4409.socialnetwork.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestFriendRepository  extends JpaRepository<RequestFriend, Integer> {
    List<RequestFriend> findRequestFriendByReceiverAndReplied(User receiver, Boolean replied);
    boolean existsBySenderAndReceiverAndReplied(User sender, User receiver, Boolean replied);
    RequestFriend findRequestFriendById(Integer id);

}
