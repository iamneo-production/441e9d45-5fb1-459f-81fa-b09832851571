package com.example.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Inventory;
import com.example.springapp.model.Shipment;
import com.example.springapp.repository.InventoryRepository;
import com.example.springapp.repository.ShipmentRepository;

@Service
public class ShipmentService {
	private final ShipmentRepository shipmentRepository;

    public ShipmentService(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    public List<Shipment> getAllShipment() {
        return shipmentRepository.findAll();
    }

}
