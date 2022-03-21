package com.it4409.socialnetwork.service.serviceinterface;

import com.it4409.socialnetwork.dto.FriendState;
import com.it4409.socialnetwork.dto.RequestFriendDTO;
import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.ReplyRequestFriendForm;
import com.it4409.socialnetwork.entities.RequestFriend;
import com.it4409.socialnetwork.entities.User;

import java.util.List;

public interface FriendService {
    List<UserDTO> getListFriend(String username);
    List<RequestFriendDTO> getListRequestFriend(String username);
    boolean sendRequestFriend(String username, String receiverUsername);
    boolean replyRequestFriend(String username, ReplyRequestFriendForm form);
    FriendState getFriendState(String username1, String username2);
}
