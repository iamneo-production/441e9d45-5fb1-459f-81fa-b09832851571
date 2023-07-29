package com.example.springapp.exceptions;


	import java.util.HashMap;
	import java.util.Map;

	import org.springframework.dao.DataIntegrityViolationException;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.validation.FieldError;
	import org.springframework.web.bind.MethodArgumentNotValidException;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.RestControllerAdvice;
	import com.example.springapp.payloads.ApiResponse;
	
	@RestControllerAdvice
	public class GlobalExceptionHandler {
		
		@ExceptionHandler(ResourceNotFoundException.class)
		public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
			String message = ex.getMessage();
			ApiResponse apiResponse = new ApiResponse(message, false);
			return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
		}


		@ExceptionHandler(MethodArgumentNotValidException.class)
		public ResponseEntity<Map<String, String>> handleMethodArgsNotValidException(MethodArgumentNotValidException ex) {
			Map<String, String> resp = new HashMap<>();
			ex.getBindingResult().getAllErrors().forEach((error) -> {
				String fieldName = ((FieldError) error).getField();
				String message = error.getDefaultMessage();
				resp.put(fieldName, message);
			});

			return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);
		}
		
		@ExceptionHandler(DataIntegrityViolationException.class)
	    public ResponseEntity<String> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
	        String errorMessage = "Data integrity violation occurred: " + ex.getMessage();
	        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
	    }

	    // You can have more exception handlers for other specific exceptions if needed

	    // Generic exception handler to handle any uncaught exceptions
	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGenericException(Exception ex) {
	        String errorMessage = "An error occurred: " + ex.getMessage();
	        return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
		
		

	}

	
