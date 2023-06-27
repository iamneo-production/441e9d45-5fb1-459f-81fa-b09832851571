package com.example.springapp.exception;

public class ShipmentNotFoundException extends RuntimeException {
    public ShipmentNotFoundException(Long id) {
        super("Could not found the user with id " + id);
    }
}
