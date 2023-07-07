package com.example.springapp.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ship")
@Getter
@Setter
@ToString
public class Shipment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int productid;
	private int quantity;
	private String location;
	private String timestamp;

}
