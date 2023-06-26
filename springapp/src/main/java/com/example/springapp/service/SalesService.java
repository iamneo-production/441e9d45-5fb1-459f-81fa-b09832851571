package com.example.springapp.service;
import com.example.entity.Sales;
import com.example.springapp.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;




@Transactional
@Service
public class SalesService {

    @Autowired
    public SalesRepository salesRepository;

    public void insert(Sales sales) {
        salesRepository.save(sales);
    }

    public Optional<Sales> find(int id) {
        return salesRepository.findById(id);
    }

    public Iterable<Sales> findAll() {
        return salesRepository.findAll();
    }

    public void updateSales(Sales sales) {
        salesRepository.save(sales);
    }

    public void deleteSales(Sales sales) {
        salestRepository.delete(sales);
    }


}