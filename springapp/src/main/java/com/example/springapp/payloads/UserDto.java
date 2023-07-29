package com.example.springapp.payloads;



import javax.validation.constraints.Email;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserDto {
	
	private int id;
	
	
	@NotEmpty
	@Size(min = 4 , message = "Name should be minimum of size 4")
	private String name;
	
	
	@Email
	@NotEmpty(message = "Email is required")
	private String email;
	
	@NotEmpty
	@Size(min = 3, max = 10 , message = "Password must be minimum of 3 chars and maximum of 10 chars")
	private String password;
	
	
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	

}