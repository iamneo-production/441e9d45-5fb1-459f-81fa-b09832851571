package com.example.springapp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;


import com.example.springapp.model.User;
import com.example.springapp.exceptions.ResourceNotFoundException;
import com.example.springapp.payloads.UserDto;
import com.example.springapp.repository.UserRepo;
import com.example.springapp.service.UserService;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo; 	

	@Override
    public UserDto createUser(UserDto userDto) {
        if (!userRepo.existsByEmail(userDto.getEmail())) {
            String password = userDto.getPassword();

            // Validate password
            if (isValidPassword(password)) {
                String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
                userDto.setPassword(hashedPassword);

                User user = dtotoUser(userDto);
                User savedUser = userRepo.save(user);
                return usertoDto(savedUser);
            } else {
                // If the password does not meet the requirements, throw an exception indicating this
                throw new RuntimeException("Invalid password. Password should be a minimum of 7 characters and a maximum of 12 characters, and it should contain at least one capital letter, one small letter, one number, and one special character.");
            }
        } else {
            // If User with the given email already exists, throw an exception indicating this
            throw new RuntimeException("User with the given email already exists");
        }
    }
		
		
	private boolean isValidPassword(String password) {

		String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{7,12}$";
        return password.matches(passwordPattern);
	}

	
	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());

		User updatedUser = this.userRepo.save(user);
		return this.usertoDto(updatedUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));

		return this.usertoDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {

		List<User> users = this.userRepo.findAll();
		List<UserDto> userDtos = users.stream().map(user->this.usertoDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		this.userRepo.delete(user);

	}
	
	@Override
    public boolean checkIfUserExistsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public boolean checkIfValidUser(String email, String password) {
        // Retrieve the user by email from the database
        User user = userRepo.findByEmail(email);

        // Check if the user exists and if the provided password matches the stored password
        
        return user != null && BCrypt.checkpw(password, user.getPassword());        
    }
    
	
	public User dtotoUser(UserDto userDto)
	{
		User user = new User();
		user.setId(userDto.getId());
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		return user;
	}
	
	public UserDto usertoDto(User user)
	{
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setEmail(user.getEmail());
		userDto.setPassword(user.getPassword());
		return userDto;
		
	}

}