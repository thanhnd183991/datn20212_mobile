package com.it4409.socialnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendState {
    Integer state;
    // 0 là 2 người không quen biết, tức là user1 và user2 không có quan hệ bạn bè, hiện không tồn tại requestfriend chưa trả lời giữa hai người
    // 1 là 2 người đã là bạn bè
    // 2 là 2 người chưa là bạn bè, user1 đã gửi yêu cầu bạn bè cho user2 nhưng chưa được phản hồi
    // 3 là 2 người chưa là bạn bè, user 1 nhận được yêu cầu bạn bè từ user2 nhưng chưa phản hồi lại
    // 4 chính là bản thân
}
