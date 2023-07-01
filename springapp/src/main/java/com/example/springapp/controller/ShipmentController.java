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
import com.example.springapp.model.PurchaseOrder;
import com.example.springapp.model.Shipment;
import com.example.springapp.repository.PurchaseOrderRepository;
import com.example.springapp.repository.ShipmentRepository;
import com.example.springapp.service.ShipmentService;

@RestController
@RequestMapping("shipment")
public class ShipmentController {
	
	private final ShipmentService shipmentService;
	
	public ShipmentController(ShipmentService shipmentService) {
		this.shipmentService = shipmentService;
	}
	
	@GetMapping
	public ResponseEntity<List<Shipment>> getAllShipment() {
        List<Shipment> shipmentList = shipmentService.getAllShipment();
        return new ResponseEntity<>(shipmentList, HttpStatus.OK);
    }
	
}
