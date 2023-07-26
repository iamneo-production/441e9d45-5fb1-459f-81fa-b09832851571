// package com.example.springapp.model;



// import java.sql.Date;

// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.Table;

// import lombok.Getter;
// import lombok.Setter;
// import lombok.ToString;

// @Entity
// @Table(name = "sales")
// @Getter
// @Setter
// @ToString
// public class Sales {

// 	@Id
// 	@GeneratedValue(strategy = GenerationType.AUTO)
// 	private Long id;
// 	private Long productid;
// 	private String productname;
// 	private Long quantity;
// 	private Double price;
// 	private Date timestamp;

// }


package com.example.springapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sales")
public class Sales {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "product_id")
	private Long productId;
	
	private Long quantity;
	
	private double price;
	
	@Column(name = "timestamp")
	private Date timestamp;

	public Sales(Long id, Long productId, Long quantity, double price, Date timestamp) {
		super();
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.price = price;
		this.timestamp = timestamp;
	}
	
	public Sales() {
		
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Sales [id=" + id + ", productId=" + productId + ", quantity=" + quantity + ", price=" + price
				+ ", timestamp=" + timestamp + "]";
	}
	
	
}