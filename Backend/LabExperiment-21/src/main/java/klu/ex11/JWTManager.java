package klu.ex11;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTManager {
   public SecretKey key = Keys.hmacShaKeyFor("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtstuvwxyz0123456789".getBytes());
   
   public String generateToken(String username) {
     Map<String, String> claims = new HashMap<>();
     claims.put("username", encryptData(username));
     
     return Jwts.builder()
     .setClaims(claims)
     .setIssuedAt(new Date())
     .setExpiration(new Date(new Date().getTime() + 86400000))
     .signWith(key)
     .compact();
   }
   
   public Map<String, String> validateToken(String Token){
     try {
       Claims claims = Jwts.parserBuilder()
                 .setSigningKey(key)
                 .build()
                 .parseClaimsJws(Token)
                 .getBody();
       Date expiration = claims.getExpiration();
       if(expiration == null || expiration.before(new Date())) {
         Map<String, String> res = new HashMap<>();
         res.put("code", "404");
         res.put("message", "Invalid Token");
         return res;
       }
       Map<String, String> res = new HashMap<>();
       res.put("code", "200");
       res.put("message", decryptData(claims.get("username", String.class)));
       return res;
     }
     catch(Exception e) {
       Map<String, String> res = new HashMap<>();
       res.put("code", "404");
       res.put("message", "Invalid Token");
       return res;
     }
   }
   public String encryptData(String data) {
     try {
       MessageDigest MD5 = MessageDigest.getInstance("SHA-256");
       byte[] keyBytes = MD5.digest("DEEPAK".getBytes());
       SecretKey key1 = new SecretKeySpec(keyBytes, 0, 16, "AES");
       
       Cipher cipher = Cipher.getInstance("AES");
       cipher.init(Cipher.ENCRYPT_MODE, key1);
       
       byte[] encyyptData = cipher.doFinal(data.getBytes());
       return Base64.getEncoder().encodeToString(encyyptData);      
     }
     catch(Exception e) {
       return e.getMessage();
     }
   }
   public String decryptData(String data) {
     try {
       MessageDigest MD5 = MessageDigest.getInstance("SHA-256");
       byte[] keyBytes = MD5.digest("DEEPAK".getBytes());
       SecretKey key1 = new SecretKeySpec(keyBytes, 0, 16, "AES");
       
       Cipher cipher = Cipher.getInstance("AES");
       cipher.init(Cipher.DECRYPT_MODE, key1);
       
       byte[] decryptData = cipher.doFinal(Base64.getDecoder().decode(data));
       return new String(decryptData);      
     }
     catch(Exception e) {
       return e.getMessage();
     }
   }
   
 }