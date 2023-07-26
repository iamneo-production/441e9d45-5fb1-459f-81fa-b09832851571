package com.example.springapp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.springapp.payloads.ApiResponse;
import com.example.springapp.payloads.LoginDto;
import com.example.springapp.payloads.UserDto;
import com.example.springapp.service.UserService;
import com.example.springapp.config.CorsConfig;


@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	 
	@PostMapping("/signup")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto)
	{
		UserDto createUserDto = this.userService.createUser(userDto);
		return new ResponseEntity<>(createUserDto,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginRequest) {
        // Validate request body
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        // Check if the user exists in the database
        boolean isUserExists = userService.checkIfUserExistsByEmail(loginRequest.getEmail());
        if (!isUserExists) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials. Please try again.");
        }

        // Check if the provided email and password match a user
        boolean isLoginSuccessful = userService.checkIfValidUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (isLoginSuccessful) {
            // If login is successful, return a success response
            ApiResponse loginResponse = new ApiResponse("Login successful.", isLoginSuccessful);
            return ResponseEntity.ok(loginResponse);
        } else {
            // If login is not successful, return an unauthorized response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials. Please try again.");
        }
    }
	
	// PUT- update user

	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable("userId") Integer uid) {
		UserDto updatedUser = this.userService.updateUser(userDto, uid);
		return ResponseEntity.ok(updatedUser);
	}
	
	// Delete -user
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable("userId") Integer uid)
	{
		this.userService.deleteUser(uid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted Successfully", true), HttpStatus.OK);
	}
	
	// GET - user get
	
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		return ResponseEntity.ok(this.userService.getAllUsers());
	}
	
	// GET - user get
	
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable Integer userId) {
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}
	
	//logout
	
	/*@PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the user's session
        request.getSession().invalidate();

        // Clear any related cookies
        clearCookies(request, response);

        ApiResponse apiResponse = new ApiResponse("Logout successful", true);
        return ResponseEntity.ok(apiResponse);
    }

    // Method to clear cookies
    private void clearCookies(HttpServletRequest request, HttpServletResponse response) {
        // Replace "JSESSIONID" with the name of the session cookie if you are using a custom cookie name
        javax.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (javax.servlet.http.Cookie cookie : cookies) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }*/
	


}
