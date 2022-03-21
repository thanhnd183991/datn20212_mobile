package com.it4409.socialnetwork.service;

import com.it4409.socialnetwork.dto.FriendState;
import com.it4409.socialnetwork.dto.RequestFriendDTO;
import com.it4409.socialnetwork.dto.UserDTO;
import com.it4409.socialnetwork.entities.Form.ReplyRequestFriendForm;
import com.it4409.socialnetwork.entities.Friend;
import com.it4409.socialnetwork.entities.RequestFriend;
import com.it4409.socialnetwork.entities.User;
import com.it4409.socialnetwork.entities.key.FriendKey;
import com.it4409.socialnetwork.repository.FriendRepository;
import com.it4409.socialnetwork.repository.RequestFriendRepository;
import com.it4409.socialnetwork.repository.UserRepository;
import com.it4409.socialnetwork.service.serviceinterface.FriendService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FriendServiceImpl implements FriendService {
    private UserRepository userRepository;
    private FriendRepository friendRepository;
    private RequestFriendRepository requestFriendRepository;
//    private EntityManagerFactory factory;


    @Override
    public List<UserDTO> getListFriend(String username) {
        User user = userRepository.findByUsername(username);
        List<Friend> friendList = friendRepository.findByUser1(user);
        List<UserDTO> rs = new ArrayList<>();
        friendList.forEach(friend -> {
            User user2 = friend.getUser2();
            rs.add(new UserDTO(user2));
        });
        return rs;
    }

    @Override
    public List<RequestFriendDTO> getListRequestFriend(String username) {
        User receiver = userRepository.findByUsername(username);
        List<RequestFriend> requestFriendList = requestFriendRepository.findRequestFriendByReceiverAndReplied(receiver, new Boolean(false));
        List<RequestFriendDTO> rs = new ArrayList<>();
        requestFriendList.forEach(requestFriend -> {
            rs.add(new RequestFriendDTO(requestFriend));
        });
        return rs;
    }

    @Override
    public boolean sendRequestFriend(String username, String receiverUsername) {
        User sender = userRepository.findByUsername(username);
        User receiver = userRepository.findByUsername(receiverUsername);
        boolean exist = requestFriendRepository.existsBySenderAndReceiverAndReplied(receiver, sender, new Boolean(false));
        exist = exist || requestFriendRepository.existsBySenderAndReceiverAndReplied(sender, receiver, new Boolean(false));
        boolean isFriend = friendRepository.existsByUser1AndUser2(sender, receiver);
        if (sender.getId() == receiver.getId() || exist || isFriend) {
            return false;
        }
        RequestFriend requestFriend = RequestFriend.builder()
                .sender(sender)
                .receiver(receiver)
                .replied(new Boolean(false))
                .build();
        requestFriendRepository.save(requestFriend);
        return true;
    }


    @Override
    public boolean replyRequestFriend(String username, ReplyRequestFriendForm form) {
        User receiver = userRepository.findByUsername(username);
        RequestFriend requestFriend = requestFriendRepository.findRequestFriendById(form.getId());

        if (receiver.getId() != requestFriend.getReceiver().getId() || requestFriend.getReplied()) {
            return false;
        }
        User sender = requestFriend.getSender();
        requestFriend.setReplied(new Boolean(true));
        if (form.getAccepted()) {
            Friend friend1 = Friend.builder()
                    .id(new FriendKey(sender.getId(), receiver.getId()))
                    .user1(sender)
                    .user2(receiver)
                    .build();
            Friend friend2 = Friend.builder()
                    .id(new FriendKey(receiver.getId(), sender.getId()))
                    .user1(receiver)
                    .user2(sender)
                    .build();
            friendRepository.save(friend1);
            friendRepository.save(friend2);
            sender.setNumberOfFriends(sender.getNumberOfFriends() + 1);
            receiver.setNumberOfFriends(receiver.getNumberOfFriends() + 1);
            userRepository.save(sender);
            userRepository.save(receiver);

        }
        requestFriendRepository.save(requestFriend);
        return true;
    }

    @Override
    public FriendState getFriendState(String username1, String username2) {
        FriendState rs = new FriendState();
        User user1 = userRepository.findByUsername(username1);
        User user2 = userRepository.findByUsername(username2);
        if (user1.getId() == user2.getId()) {
            rs.setState(5);
            return rs;
        }
        boolean isFriend = friendRepository.existsByUser1AndUser2(user1, user2);
        if (isFriend) {
            rs.setState(1);
            return rs;
        }
        boolean existSendRequest = requestFriendRepository.existsBySenderAndReceiverAndReplied(user1, user2, new Boolean(false));
        boolean existReceiveRequest = requestFriendRepository.existsBySenderAndReceiverAndReplied(user2, user1, new Boolean(false));
        if (existSendRequest) {
            rs.setState(2);
            return rs;
        } else if (existReceiveRequest) {
            rs.setState(3);
            return rs;
        }
        rs.setState(0);
        return rs;
    }

}
