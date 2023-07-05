package com.example.springapp.service;

import java.util.ArrayList;
import java.util.*;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Inventory;
import com.example.springapp.model.PurchaseOrder;
import com.example.springapp.repository.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {
	
	private final PurchaseOrderRepository purchaseOrderRepository;

	public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository) {
		this.purchaseOrderRepository = purchaseOrderRepository;
	}
	
	public List<PurchaseOrder> getAllPurchaseOrder() {
        return purchaseOrderRepository.findAll();
    }
	
	
	
	public List<PurchaseOrder> getPurchaseOrderByProductId(Long id) {
    	List<PurchaseOrder> list = purchaseOrderRepository.findAll();
		List<PurchaseOrder> ans = new ArrayList<>();
        for(PurchaseOrder p:list) {
        	if(p.getId().equals(id)) {
        		ans.add(p);
        	}
        }
        return ans;
    }
	
}
