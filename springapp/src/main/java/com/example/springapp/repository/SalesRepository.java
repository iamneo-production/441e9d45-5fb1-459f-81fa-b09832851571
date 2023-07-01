package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Sales;

public interface SalesRepository extends JpaRepository<Sales, Integer> {

}
