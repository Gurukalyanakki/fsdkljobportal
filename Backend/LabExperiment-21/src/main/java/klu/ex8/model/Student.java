package klu.ex8.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {
	
   @Id
	int id;
	String name;
	int phonenum;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPhonenum() {
		return phonenum;
	}
	public void setPhonenum(int phonenum) {
		this.phonenum = phonenum;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", phonenum=" + phonenum + "]";
	}

	
	
}