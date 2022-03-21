package com.it4409.socialnetwork.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.it4409.socialnetwork.security.SecurityContants;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTService {
    public String generateToken(String username) throws Exception{
        return SecurityContants.TOKEN_PREFIX + JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityContants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityContants.SECRET.getBytes()));
    }

    public String decode(String token){
        try{
            return JWT.require(Algorithm.HMAC512(SecurityContants.SECRET.getBytes()))
                    .build().verify(token.replace(SecurityContants.TOKEN_PREFIX, ""))
                    .getSubject();
        }catch (Exception ex){
            return null;
        }
    }
}
