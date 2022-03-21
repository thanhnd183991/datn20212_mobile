package com.it4409.socialnetwork.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class EncodeUtil {
    public static String getSHA256(String str){
        String rs = null;
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(str.getBytes());
            rs = bytesToHex(md.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return rs;
    }

    public static String bytesToHex(byte[] bytes){
        StringBuilder rs = new StringBuilder();
        for(byte byt: bytes){
            rs.append(Integer.toString((byt&0xff) + 0x100, 16).substring(1));
        }
        return rs.toString();
    }
}
