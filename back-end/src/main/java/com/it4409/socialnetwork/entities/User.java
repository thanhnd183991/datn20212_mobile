package com.it4409.socialnetwork.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "validated_email")
    private Boolean validatedEmail;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "joining_date")
    private Date joiningDate;

    @Column(name = "address")
    private String address;

    @Column(name = "number_of_friends")
    private Integer numberOfFriends;

    @Column(name = "number_of_posts")
    private Integer numberOfPosts;

    @Column(name = "number_of_images")
    private Integer numberOfImages;

    @OneToOne
    @JoinColumn(name = "profile_image_id")
    private Image profile_Image;

    @Override
    public String toString(){
        return "User{" +
                "id = " +
                ", username = " + id +
                ", email = " + email +
                ", validated_email = " + validatedEmail +
                ", name = " + name +
                ", password = " + password +
                ", date_of_birth = " + dateOfBirth +
                ", joining_date = " + joiningDate +
                ", address = " + address +
                ", number_of_friends = " + numberOfFriends +
                ", number_of_posts = " + numberOfPosts +
                ", number_of_images = " + numberOfImages +
                ", profile_image_id = " + profile_Image +
                "}";
    }
}
