package com.example.springapp.service;

import java.util.List;

import com.example.springapp.model.Sales;

public interface SalesServiceInterface {

	public Sales addSales(Sales sales);

	public List<Sales> getAllSales();

	public Sales getSalesById(Long salesid);

	public void deleteSalesById(Long salesid);

}
