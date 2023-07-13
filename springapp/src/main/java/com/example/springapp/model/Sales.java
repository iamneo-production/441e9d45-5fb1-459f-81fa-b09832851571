package com.example.springapp.model;



import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "sales")
@Getter
@Setter
@ToString
public class Sales {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Long productid;
	private String productname;
	private Long quantity;
	private Double price;
	private Date timestamp;

}