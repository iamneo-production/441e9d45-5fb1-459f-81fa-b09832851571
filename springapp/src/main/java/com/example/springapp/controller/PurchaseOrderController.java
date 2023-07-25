package com.example.springapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
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
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/purchase-order")
@CrossOrigin
public class PurchaseOrderController {
	
	private final PurchaseOrderService purchaseOrderService;

	public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
		this.purchaseOrderService = purchaseOrderService;
	}
	
	@PostMapping
	public ResponseEntity<PurchaseOrder> createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
        PurchaseOrder createdPurchaseOrder = purchaseOrderService.createPurchaseOrder(purchaseOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPurchaseOrder);
    }
	
	@GetMapping
	public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrder() {
        List<PurchaseOrder> purchaseOrderList = purchaseOrderService.getAllPurchaseOrder();
        return new ResponseEntity<>(purchaseOrderList, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<PurchaseOrder> getPurchaseOrderByProductId(@PathVariable Long id) {
        PurchaseOrder purchaseOrder = purchaseOrderService.getPurchaseOrderByProductId(id);
        if (purchaseOrder != null) {
            return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<PurchaseOrder> updatePurchaseOrder(@PathVariable Long id, @RequestBody PurchaseOrder purchaseOrder) {
        PurchaseOrder updatedPurchaseOrder = purchaseOrderService.updatePurchaseOrder(id, purchaseOrder);
        if (updatedPurchaseOrder != null) {
            return ResponseEntity.ok(updatedPurchaseOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseOrder(@PathVariable Long id) {
        boolean deleted = purchaseOrderService.deletePurchaseOrder(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
}
