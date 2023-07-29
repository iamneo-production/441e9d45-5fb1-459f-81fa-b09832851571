package com.example.springapp.service;

import com.example.springapp.payloads.UserDto;

import java.util.List;

public interface UserService {

	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user,Integer userId);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUsers();

	void deleteUser(Integer userId);
	boolean checkIfUserExistsByEmail(String email);
	boolean checkIfValidUser(String email, String password);
	
}