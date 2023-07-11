package com.example.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.springapp.model.Inventory;
import com.example.springapp.model.Product;
import com.example.springapp.repository.InventoryRepository;
import com.example.springapp.repository.ProductRepository;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    


    public Inventory createInventory(Inventory inventory) {
        
        return inventoryRepository.save(inventory);

    }

    public Inventory getInventoryById(Long id) {
    	List<Inventory> list = inventoryRepository.findAll();
        for(Inventory p:list) {
        	if(p.getId().equals(id)) {
        		return p;
        	}
        }
        return null;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory updateInventory(Long id, Inventory updatedInventory) {
        Inventory existingInventory = getInventoryById(id);
        if (existingInventory != null) {
            existingInventory.setProduct(updatedInventory.getProduct());
            existingInventory.setQuantity(updatedInventory.getQuantity());
            existingInventory.setLocation(updatedInventory.getLocation());
            existingInventory.setTimestamp(existingInventory.getTimestamp());
            return inventoryRepository.save(existingInventory);
        } else {
            return null;
        }
    }

    public boolean deleteInventory(Long id) {
    	int ind = -1;
        List<Inventory> list = inventoryRepository.findAll();
        for(int i=0; i<list.size(); i++) {
        	Inventory p = list.get(i);
        	if(p.getId().equals(id)) {
        		ind = i;
        		break;
        	}
        }
        if(ind == -1) {
        	return false;
        }
        list.remove(ind);
        inventoryRepository.deleteAll();
        for(Inventory p:list) {
        	inventoryRepository.save(p);
        }
        return true;
    }
}
