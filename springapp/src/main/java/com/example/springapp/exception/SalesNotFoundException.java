package com.example.springapp.exception;

public class SalesNotFoundException extends RuntimeException {
    public SalesNotFoundException(Long id) {
        super("Could not found the sale with id " + id);
    }
}