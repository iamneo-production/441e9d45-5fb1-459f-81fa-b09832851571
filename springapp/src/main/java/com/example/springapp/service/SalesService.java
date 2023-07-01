package com.example.springapp.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Inventory;
import com.example.springapp.model.Sales;
import com.example.springapp.repository.SalesRepository;

@Service
public class SalesService {
	private final SalesRepository salesRepository;
	
	public SalesService(SalesRepository salesRepository) {
		this.salesRepository = salesRepository;
	}
	
	public List<Sales> getSalesByProductId(Long id) {
    	List<Sales> list = salesRepository.findAll();
		List<Sales> ans = new ArrayList<>();
        for(Sales p:list) {
        	if(p.getId().equals(id)) {
        		ans.add(p);
        	}
        }
        return ans;
    }
}
