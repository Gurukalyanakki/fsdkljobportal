package klu.ex7;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class Application {

	@GetMapping("/demo1")
	
	@ResponseBody
	public int function1() {
		return 10;
	}
	
@GetMapping("/demo2")
	
	@ResponseBody
	public double function2() {
		return 10.25;
	}
	
	
@GetMapping("/demo3")


public String function3() {
	return "First.html";
}
@GetMapping("/demo4")

@ResponseBody
public String function4() {
	String univ="KLEF";
	return "I study at "+univ;
}


List<Users> l = new ArrayList<>(); 

@PostMapping("/demo9")
@ResponseBody
public String function9(@RequestBody Users users) {
  l.add(users);
  return "User Added to the List Successfully";
}

@GetMapping("/demo9")
@ResponseBody
public List<Users> fun10() {
  return l;
}





}
