package com.it4409.socialnetwork.entities.Form;

import com.it4409.socialnetwork.entities.Image;
import lombok.Data;

import java.util.Date;

@Data
public class ProfileForm {
    private String name;
    private String email;
    private String dateOfBirth;
    private String address;
}
