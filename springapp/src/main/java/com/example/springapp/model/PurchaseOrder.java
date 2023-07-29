package com.example.springapp.model;

import java.util.*;

import javax.persistence.*;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "product_id")
	private Long productId;
	private Long quantity;
	private String supplier;
	
	@Column(name = "timestamp")
	private Date timestamp;

	public PurchaseOrder(Long id, Long productId, Long quantity, String supplier, Date timestamp) {
		super();
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.supplier = supplier;
		this.timestamp = timestamp;
	}
	
	public PurchaseOrder() {
		
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

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "PurchaseOrder [id=" + id + ", productId=" + productId + ", quantity=" + quantity + ", supplier="
				+ supplier + ", timestamp=" + timestamp + "]";
	}
	
	
}