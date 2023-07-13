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
	
	public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        return purchaseOrderRepository.save(purchaseOrder);
    }
	
	public List<PurchaseOrder> getAllPurchaseOrder() {
        return purchaseOrderRepository.findAll();
    }
	
	
	
	public PurchaseOrder getPurchaseOrderByProductId(Long id) {
    	List<PurchaseOrder> list = purchaseOrderRepository.findAll();
        for(PurchaseOrder p:list) {
        	if(p.getId().equals(id)) {
        		return p;
        	}
        }
        return null;
    }
	
	public PurchaseOrder updatePurchaseOrder(Long id, PurchaseOrder updatedPurchaseOrder) {
        PurchaseOrder existingPurchaseOrder = getPurchaseOrderByProductId(id);
        if (existingPurchaseOrder != null) {
        	existingPurchaseOrder.setQuantity(updatedPurchaseOrder.getQuantity());
        	existingPurchaseOrder.setSupplier(updatedPurchaseOrder.getSupplier());
        	existingPurchaseOrder.setTimestamp(updatedPurchaseOrder.getTimestamp());
        	existingPurchaseOrder.setProductId(updatedPurchaseOrder.getProductId());
            return purchaseOrderRepository.save(existingPurchaseOrder);
        } else {
            return null;
        }
    }

    public boolean deletePurchaseOrder(Long id) {
    	int ind = -1;
        List<PurchaseOrder> list = purchaseOrderRepository.findAll();
        for(int i=0; i<list.size(); i++) {
        	PurchaseOrder p = list.get(i);
        	if(p.getId().equals(id)) {
        		ind = i;
        		break;
        	}
        }
        if(ind == -1) {
        	return false;
        }
        list.remove(ind);
        purchaseOrderRepository.deleteAll();
        for(PurchaseOrder p:list) {
        	purchaseOrderRepository.save(p);
        }
        return true;
    }
	
}
