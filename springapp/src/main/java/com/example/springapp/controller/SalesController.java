package com.example.springapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SalesController {
    private final SalesRepository salesRepository;

    @Autowired
    public SalesController(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @GetMapping
    public List<Sales> getAllSales() {
        return salesRepository.findAll();
    }

    @PostMapping
    public Sales createSales(@RequestBody Sales sales) {
        return salesRepository.save(sales);
    }
    @DeleteMapping
    public Sales deleteSales(@RequestBody Sales sales) {
        return salesRepository.deleteSales(sales);
    }
}