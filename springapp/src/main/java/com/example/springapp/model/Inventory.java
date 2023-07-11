package com.example.springapp.model;

import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "inventory")
public class Inventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long quantity;
	private String location;
	
	@Column(name = "timestamp")
	private Date timestamp;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	public Inventory(Long id, Long quantity, String location, Date timestamp, Product product) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.location = location;
		this.timestamp = timestamp;
		this.product = product;
	}
	
	public Inventory() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	@Override
	public String toString() {
		return "Inventory [id=" + id + ", quantity=" + quantity + ", location=" + location + ", timestamp=" + timestamp
				+ ", product=" + product + "]";
	}
	
	
}
