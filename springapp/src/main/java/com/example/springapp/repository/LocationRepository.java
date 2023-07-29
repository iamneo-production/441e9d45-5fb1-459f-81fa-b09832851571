package com.example.springapp.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.model.Location;

import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}
