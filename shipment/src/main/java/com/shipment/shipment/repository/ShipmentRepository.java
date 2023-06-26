package com.shipment.shipment.repository;

import com.shipment.shipment.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
}
