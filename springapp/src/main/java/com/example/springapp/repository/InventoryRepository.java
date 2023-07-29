package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Inventory;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    @Query("SELECT SUM(i.quantity) FROM Inventory i")
    Long getTotalQuantity();

}