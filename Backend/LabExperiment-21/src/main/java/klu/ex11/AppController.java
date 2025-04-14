package klu.ex11;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
  
  @Autowired
  JWTManager JM;
  
  @GetMapping("/login")
  public String fun1(@RequestParam("username") String username) {
    return JM.generateToken(username);
  }
  @GetMapping("/validate")
  public Map<String, String> fun2(@RequestParam("token") String token){
    return JM.validateToken(token);
  }


  
    
  

}