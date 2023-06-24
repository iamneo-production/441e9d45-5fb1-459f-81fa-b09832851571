package main.java.com.example.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Sales;

@Repository
public interface SalesRepository extends JpaRepository<Sales,Long>{
    
}
