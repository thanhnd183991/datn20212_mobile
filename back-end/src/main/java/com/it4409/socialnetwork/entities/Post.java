package com.it4409.socialnetwork.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "post")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_date", insertable = false)
    private Date postingDate;

    @Column(name = "number_of_comments")
    private Integer numberOfComments;

    @Column(name = "number_of_hearts")
    private Integer numberOfHearts;

    @Column(name = "number_of_images")
    private Integer numberOfImages;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User user;

    @ManyToMany
    @JoinTable(name = "images_of_post", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "image_id"))
    private List<Image> images;

    @ManyToMany
    @JoinTable(name = "reaction_of_post", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> reactionUsers;

    @OneToMany(mappedBy = "post")
    @JsonSerialize(using = Comment.ListSerializer.class)
    private List<Comment> comments;


}
