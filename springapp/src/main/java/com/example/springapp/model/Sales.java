package com.example.springapp.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.xml.crypto.Data;

@Entity
public class Sales {

    @Id
    @GeneratedValue
    private Long id;
    private Long productid;
    private Long quantity;
    private Double price;
    private Date timestamp;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProductid() {
        return productid;
    }
    public void setProductid(Long productid) {
        this.productid = productid;
    }
    public Long getQuantity() {
        return quantity;
    }
    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public Date getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}

   