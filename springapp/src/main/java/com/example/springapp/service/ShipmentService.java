package com.example.springapp.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Shipment;
import com.example.springapp.repository.ShipmentRepository;

@Service
public class ShipmentService implements ShipmentServiceInterface {

	@Autowired
	private ShipmentRepository crudRepo;

	@Override
	public Shipment addShipment(Shipment shipment) {
		Shipment savedShipment = crudRepo.save(shipment);
		return savedShipment;

	}

	@Override
	public List<Shipment> getAllShipments() {
		return crudRepo.findAll();
	}

	@Override
	public Shipment getShipById(Long shipidL) {
		return crudRepo.findById(shipidL).get();
	}

	@Override
	public void deleteShipById(Long shipidL) {
		crudRepo.deleteById(shipidL);
	}

}

}