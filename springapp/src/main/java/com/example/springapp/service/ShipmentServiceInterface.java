package com.example.springapp.service;

import java.util.List;

import com.example.springapp.model.Shipment;

public interface ShipmentServiceInterface {

	public Shipment addShipment(Shipment shipment);

	public List<Shipment> getAllShipments();

	public Shipment getShipById(Long shipidL);

	public void deleteShipById(Long shipidL);

}
