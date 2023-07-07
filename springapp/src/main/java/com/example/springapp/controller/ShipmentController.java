package com.example.springapp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Shipment;
import com.example.springapp.service.ShipmentServiceInterface;

@RestController
@CrossOrigin("https://8081-aabbafaeecebdfaddeebcaddaceaeaadbdbabf.project.examly.io")
@RequestMapping("/api")
public class ShipmentController {

	@Autowired
	private ShipmentServiceInterface shipmentServiceInterface;

	@PostMapping("/post")
	public ResponseEntity<Shipment> addShipment(@RequestBody Shipment shipment) {
		Shipment shipmentSaved = shipmentServiceInterface.addShipment(shipment);
		return new ResponseEntity<Shipment>(shipmentSaved, HttpStatus.CREATED);
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Shipment>> getAllShipments() {

		List<Shipment> listOfAllShips = shipmentServiceInterface.getAllShipments();
		return new ResponseEntity<List<Shipment>>(listOfAllShips, HttpStatus.OK);
	}

	@GetMapping("/get/{shipid}")
	public ResponseEntity<Shipment> getShipById(@PathVariable("shipid") Long shipidL) {

		Shipment shipRetrieved = shipmentServiceInterface.getShipById(shipidL);
		return new ResponseEntity<Shipment>(shipRetrieved, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{shipid}")
	public ResponseEntity<Void> deleteShipById(@PathVariable("shipid") Long shipidL) {

		shipmentServiceInterface.deleteShipById(shipidL);
		return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
	}

	@PutMapping("/update")
	public ResponseEntity<Shipment> updateShipment(@RequestBody Shipment shipment) {
		Shipment shipmentSaved = shipmentServiceInterface.addShipment(shipment);
		return new ResponseEntity<Shipment>(shipmentSaved, HttpStatus.CREATED);
	}

}
