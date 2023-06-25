package com.shipment.shipment.repository;

import com.shipment.shipment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

