package com.it4409.socialnetwork.repository;

import com.it4409.socialnetwork.entities.Message;
import com.it4409.socialnetwork.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m from Message m WHERE (m.sender = ?1 and  m.receiver = ?2) or (m.sender = ?2 and  m.receiver = ?1) ORDER BY m.sendingDate ASC ")
    List<Message> findMessageBySenderAndReceiver(User sender, User Receiver);

    Message findMessageById(Integer id);
}
