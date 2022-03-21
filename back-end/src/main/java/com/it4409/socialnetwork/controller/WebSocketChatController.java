package com.it4409.socialnetwork.controller;


import java.util.Set;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;


import com.it4409.socialnetwork.dto.MessageDTO;
import com.it4409.socialnetwork.service.serviceinterface.MessageService;
import com.it4409.socialnetwork.utils.ActiveUserChangeListener;
import com.it4409.socialnetwork.utils.ActiveUserManager;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class WebSocketChatController implements ActiveUserChangeListener {

    private SimpMessagingTemplate webSocket;

    private ActiveUserManager activeUserManager;

    private MessageService messageService;

    @PostConstruct
    private void init() {
        activeUserManager.registerListener(this);
    }

    @PreDestroy
    private void destroy() {
        activeUserManager.removeListener(this);
    }

    @MessageMapping("/chat")
    public void send(SimpMessageHeaderAccessor sha, @Payload MessageDTO messageDTO) throws Exception {
//        System.out.println(sha.getNativeHeader("sender"));
//        System.out.println(sha.getUser());
        MessageDTO message = messageService.saveMessage(messageDTO);
        String sender = sha.getNativeHeader("sender").get(0);
        if (!sender.equals(messageDTO.getReceiver())) {
            webSocket.convertAndSendToUser(sender, "/messages", message);
        }
        webSocket.convertAndSendToUser(messageDTO.getReceiver(), "/messages", message);
    }

    @Override
    public void notifyActiveUserChange() {
        Set<String> activeUsers = activeUserManager.getAll();
        webSocket.convertAndSend("/topic/active", activeUsers);
    }

    @MessageMapping("/broadcast") // endpoint ma nguoi dung gui tin nhan
    @SendTo("/topic/broadcast") // endpoint nguoi dung subcribe de nhan tin nhan
    public MessageDTO send(MessageDTO messageDTO) throws Exception {
//        System.out.println(chatMessage.getFrom()+": "+chatMessage.getText());
        return new MessageDTO(messageDTO.getSender(), messageDTO.getContent(), "ALL");
    }
}
