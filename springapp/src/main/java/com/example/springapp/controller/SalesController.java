package com.example.springapp.controller;

import com.example.springapp.exception.SalesNotFoundException;
import com.example.springapp.model.Sales;
import com.example.springapp.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:8080")
public class SalesController {

    @Autowired
    private SalesRepository salesRepository;

    @PostMapping("/postsales")
    Sales newSales(@RequestBody Sales newSales) {
        return salesRepository.save(newSales);
    }

    @GetMapping("/getallsales")
    List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    @GetMapping("/sales/{id}")
    Sales getSalesById(@PathVariable Long id) {
        return salesRepository.findById(id)
                .orElseThrow(() -> new SalesNotFoundException(id));
    }

    @PutMapping("/updatesales/{id}")
    Sales updateSales(@RequestBody Sales newSales, @PathVariable Long id) {
        return salesRepository.findById(id)
                .map(sales -> {
                    sales.setQuantity(newSales.getQuantity());
                    sales.setProductid(newSales.getProductid());
                    sales.setPrice(newSales.getPrice());
                    sales.setTimestamp(newSales.getTimestamp());
                    return salesRepository.save(sales);
                }).orElseThrow(() -> new SalesNotFoundException(id));
    }

    @DeleteMapping("/deletesales/{id}")
    String deleteSales(@PathVariable Long id) {
        if (!salesRepository.existsById(id)) {
            throw new SalesNotFoundException(id);
        }
        salesRepository.deleteById(id);
        return "Sales with id " + id + " has been deleted success.";
    }

}