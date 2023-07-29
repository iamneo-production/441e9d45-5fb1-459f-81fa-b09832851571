package com.example.springapp.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Sales;
import com.example.springapp.repository.SalesRepository;

@Service
public class SalesService implements SalesServiceInterface {

	@Autowired
	private SalesRepository repository;

	@Override
	public Sales addSales(Sales sales) {
		return repository.save(sales);

	}

	@Override
	public List<Sales> getAllSales() {
		return repository.findAll();
	}

	@Override
	public List<Sales> getSalesByProductId(Long salesid) {
		List<Sales> list= repository.findAll();
		List<Sales> ans= new ArrayList<>();
		for(Sales p:list) {
        	if(p.getId().equals(salesid)) {
        		ans.add(p);
        	}
        }
        return ans;

	}

	@Override
	public void deleteSalesById(Long salesid) {
		repository.deleteById(salesid);
	}

}