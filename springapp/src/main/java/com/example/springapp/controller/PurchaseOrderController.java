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
import com.example.springapp.model.Product;
import com.example.springapp.model.PurchaseOrder;
import com.example.springapp.repository.ProductRepository;
import com.example.springapp.repository.PurchaseOrderRepository;
import com.example.springapp.service.PurchaseOrderService;

@RestController
@RequestMapping("/purchase-order")
public class PurchaseOrderController {
	
	private final PurchaseOrderService purchaseOrderService;

	public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
		this.purchaseOrderService = purchaseOrderService;
	}
	
	@GetMapping
	public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrder() {
        List<PurchaseOrder> purchaseOrderList = purchaseOrderService.getAllPurchaseOrder();
        return new ResponseEntity<>(purchaseOrderList, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<List<PurchaseOrder>> getPurchaseOrderByProductId(@PathVariable Long id) {
        List<PurchaseOrder> purchaseOrders = purchaseOrderService.getPurchaseOrderByProductId(id);
        if (purchaseOrders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(purchaseOrders, HttpStatus.OK);
    }
	
}
