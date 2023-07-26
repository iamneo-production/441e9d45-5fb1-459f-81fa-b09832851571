package com.example.springapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.example.springapp.model.Inventory;
import com.example.springapp.model.Sales;
import com.example.springapp.model.Shipment;
import com.example.springapp.repository.SalesRepository;
import com.example.springapp.repository.ShipmentRepository;
import com.example.springapp.service.SalesService;

@RestController
@RequestMapping("/sales")
public class SalesController {
	
	private final SalesService salesService;
	
	public SalesController(SalesService salesService) {
		this.salesService = salesService;
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<List<Sales>> getSalesByProductId(@PathVariable Long productId) {
        List<Sales> sales = salesService.getSalesByProductId(productId);
        return new ResponseEntity<>(sales, HttpStatus.OK);
    }
	
}
