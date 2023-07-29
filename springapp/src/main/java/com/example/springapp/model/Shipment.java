package com.example.springapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "shipments")
public class Shipment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "product_id")
	private Long productId;
	
	private Long quantity;
	private String location;
	
	@Column(name = "timestamp")
	private Date timestamp;

	public Shipment(Long id, Long productId, Long quantity, String location, Date timestamp) {
		super();
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.location = location;
		this.timestamp = timestamp;
	}
	
	public Shipment() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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

	@Override
	public String toString() {
		return "Shipment [id=" + id + ", productId=" + productId + ", quantity=" + quantity + ", location=" + location
				+ ", timestamp=" + timestamp + "]";
	}
	
	
}