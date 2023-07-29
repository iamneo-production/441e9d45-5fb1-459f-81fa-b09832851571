package com.example.springapp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.model.Sales;
import com.example.springapp.service.SalesServiceInterface;

@RestController
@CrossOrigin
@RequestMapping("/sales")
public class SalesController {

	@Autowired
	private SalesServiceInterface salesServiceInterface;

	@PostMapping("/post")
	public ResponseEntity<Sales> addSales(@RequestBody Sales sales) {
		Sales salesSaved = salesServiceInterface.addSales(sales);
		return new ResponseEntity<>(salesSaved, HttpStatus.CREATED);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Sales>> getAllSales() {

		List<Sales> listOfAllSales = salesServiceInterface.getAllSales();
		return new ResponseEntity<>(listOfAllSales, HttpStatus.OK);
	}

	@GetMapping("/{salesid}")
	public ResponseEntity<List<Sales>> getSalesByProductId(@PathVariable("salesid") Long salesid) {

		List<Sales> salesRetrieved = salesServiceInterface.getSalesByProductId(salesid);
		if (salesRetrieved.size() != 0) {
            return new ResponseEntity<>(salesRetrieved, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

		
	}

	@DeleteMapping("/delete/{salesid}")
	public ResponseEntity<Void> deleteSalesById(@PathVariable("salesid") Long salesid) {

		salesServiceInterface.deleteSalesById(salesid);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}

	@PutMapping("/update")
	public ResponseEntity<Sales> updateSales(@RequestBody Sales sales) {
		Sales salesSaved = salesServiceInterface.addSales(sales);
		return new ResponseEntity<>(salesSaved, HttpStatus.CREATED);
	}

}