package com.shipment.shipment.controller;

import com.shipment.shipment.exception.ShipmentNotFoundException;
import com.shipment.shipment.model.Shipment;
import com.shipment.shipment.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ShipmentController {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @PostMapping("/postshipment")
    Shipment newShipment(@RequestBody Shipment newShipment) {
        return shipmentRepository.save(newShipment);
    }

    @GetMapping("/getallshipments")
    List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    @GetMapping("/shipments/{id}")
    Shipment getShipmentById(@PathVariable Long id) {
        return shipmentRepository.findById(id)
                .orElseThrow(() -> new ShipmentNotFoundException(id));
    }

    @PutMapping("/updateshipment/{id}")
    Shipment updateShipment(@RequestBody Shipment newShipment, @PathVariable Long id) {
        return shipmentRepository.findById(id)
                .map(shipment -> {
                    shipment.setQuantity(newShipment.getQuantity());
                    shipment.setProductid(newShipment.getProductid());
                    shipment.setLocation(newShipment.getLocation());
                    shipment.setTimestamp(newShipment.getTimestamp());
                    return shipmentRepository.save(shipment);
                }).orElseThrow(() -> new ShipmentNotFoundException(id));
    }

    @DeleteMapping("/deleteshipment/{id}")
    String deleteShipment(@PathVariable Long id) {
        if (!shipmentRepository.existsById(id)) {
            throw new ShipmentNotFoundException(id);
        }
        shipmentRepository.deleteById(id);
        return "Shipment with id " + id + " has been deleted success.";
    }

}
