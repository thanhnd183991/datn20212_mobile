package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.dto.MessageDTO;
import com.it4409.socialnetwork.entities.Message;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.repository.MessageRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;

    private UserRepository userRepository;

    public MessageDTO saveMessage(MessageDTO messageDTO){
        User sender = userRepository.findByUsername(messageDTO.getSender());
        User receiver = userRepository.findByUsername(messageDTO.getReceiver());
        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(messageDTO.getContent())
                .build();
        message = messageRepository.save(message);
        message = messageRepository.findMessageById(message.getId());
        return new MessageDTO(message);
    }

    public List<MessageDTO> getAllMessages(String currentUsername, String username){
        User currentUser = userRepository.findByUsername(currentUsername);
        User user = userRepository.findByUsername(username);
        List<Message> messages = messageRepository.findMessageBySenderAndReceiver(currentUser, user);
        List<MessageDTO> rs = new ArrayList<>();
        for(int i = 0; i < messages.size(); i++){
            rs.add(new MessageDTO(messages.get(i)));
        }
        return rs;
    }
}
