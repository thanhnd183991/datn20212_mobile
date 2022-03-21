package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.dto.MessageDTO;
import com.it4409.socialnetwork.entities.Message;

import java.util.Date;
import java.util.List;

public interface MessageService {
    public MessageDTO saveMessage(MessageDTO messageDTO);
    public List<MessageDTO> getAllMessages(String sender, String receiver);
}
