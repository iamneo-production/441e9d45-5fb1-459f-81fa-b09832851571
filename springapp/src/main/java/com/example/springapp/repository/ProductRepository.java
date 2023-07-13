package com.example.springapp.repository;

import com.example.springapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom query to find a product by id
    Product findProductById(Long id);

    // Custom query to delete a product by id
    void deleteProductById(Long id);
}