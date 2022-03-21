package com.it4409.socialnetwork.entities;

import com.it4409.socialnetwork.entities.key.FriendKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "friend")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Friend {
    @EmbeddedId
    private FriendKey id;

    @ManyToOne
    @MapsId("user1Id")
    @JoinColumn(name = "user1_id")
    private User user1;

    @ManyToOne
    @MapsId("user2Id")
    @JoinColumn(name = "user2_id")
    private User user2;
}
