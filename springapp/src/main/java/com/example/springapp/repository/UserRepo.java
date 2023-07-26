package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	
	public Boolean existsByEmail(String email);

	public User findByEmail(String email);

}
