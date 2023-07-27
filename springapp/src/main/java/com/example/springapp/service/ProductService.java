package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Product;
import com.example.springapp.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findProductById(id);
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);
        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            existingProduct.setLocation(updatedProduct.getLocation());
            existingProduct.setBarcode(existingProduct.getBarcode());
            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    public boolean deleteProduct(Long id) {
        System.out.println(id);
    	int ind = -1;
        List<Product> list = productRepository.findAll();
        for(int i=0; i<list.size(); i++) {
        	Product p = list.get(i);
        	if(p.getId().equals(id)) {
        		ind = i;
        		break;
        	}
        }
        if(ind == -1) {
        	return false;
        }
        list.remove(ind);
        productRepository.deleteAll();
        for(Product p:list) {
        	productRepository.save(p);
        }
        return true;
    }
    public Product getProductByBarcode(String barcode) {
        if (barcode == null || barcode.isEmpty()) {
            return null; // No barcode provided
        }
        return productRepository.findByBarcode(barcode);
    }
}