package com.it4409.socialnetwork.dto;

import com.it4409.socialnetwork.entities.RequestFriend;
import lombok.Data;

@Data
public class RequestFriendDTO {
    private Integer id;
    private UserDTO sender;
    private UserDTO receiver;
    private Boolean replied;
    // 0 là đang chờ phản hồi
    // 1 là đã phản hồi

    public RequestFriendDTO(RequestFriend requestFriend) {
        this.id = requestFriend.getId();
        this.sender = new UserDTO(requestFriend.getSender());
        this.receiver = new UserDTO(requestFriend.getReceiver());
        this.replied = requestFriend.getReplied();
    }
}
