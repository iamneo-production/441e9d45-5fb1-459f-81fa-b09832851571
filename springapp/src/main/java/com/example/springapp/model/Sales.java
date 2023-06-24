package main.java.com.example.springapp.model;

import javax.*;
import java.util.Date;

@Entity
@Table(name="sales")
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "Product Id")
    private long productid;

    @Column(name = "Quantity")
    private long quantity;

    @Column(name = "Price")
    private double price;

    @Column(name ="Dates")
    private Date date;

    public Sales(){

    }
    
    public Sales(long id, long productid, long quantity, double price, Date date) {
        this.id = id;
        this.productid = productid;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public long getProductid() {
        return productid;
    }
    public void setProductid(long productid) {
        this.productid = productid;
    }
    public long getQuantity() {
        return quantity;
    }
    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
}
