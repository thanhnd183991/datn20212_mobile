package com.it4409.socialnetwork.utils;

import java.security.Principal;

public class UserPrincipal implements Principal {
    String name;

    public UserPrincipal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return null;
    }
}
