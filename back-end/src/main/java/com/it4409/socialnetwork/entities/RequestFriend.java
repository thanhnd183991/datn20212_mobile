package com.it4409.socialnetwork.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "request_friend")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestFriend {

    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "request_sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "request_receiver_id")
    private User receiver;

    @Column(name = "replied")
    private Boolean replied;
    // False là đang chờ phản hồi
    // True là đã phản hồi
}
