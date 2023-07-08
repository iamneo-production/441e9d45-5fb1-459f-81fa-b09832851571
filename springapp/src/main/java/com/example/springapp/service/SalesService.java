package com.example.springapp.service;


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
		Sales savedSales = repository.save(sales);
		return savedSales;

	}

	@Override
	public List<Sales> getAllSales() {
		return repository.findAll();
	}

	@Override
	public Sales getSalesById(Long salesidL) {
		return repository.findById(salesidL).get();
	}

	@Override
	public void deleteSalesById(Long salesidL) {
		repository.deleteById(salesidL);
	}

}