package com.it4409.socialnetwork.dto;

import com.it4409.socialnetwork.entities.Message;
import com.it4409.socialnetwork.utils.StringUtils;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String id;
    private String content;
    private String sender;
    private String receiver;
    private String time;

    public MessageDTO(Message message) {
        this.id = message.getId().toString();
        this.content = message.getContent();
        this.sender = message.getSender().getUsername();
        this.receiver = message.getReceiver().getUsername();
        this.time = message.getSendingDate().toString();
    }

    public MessageDTO(String sender, String content, String receiver) {
        this.sender = sender;
        this.content = content;
        this.receiver = receiver;
        this.time = StringUtils.getCurrentTimeStamp();
    }

}
