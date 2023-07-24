import NavbarComp from './NavbarComp';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {

    const[quantity,setQuantity]=useState(0); 
    const[salesData,setSalesData]= useState([]);
    useEffect(()=>{
        fetchInventoryQuantity();
        fetchSalesData();
    },[])


    const fetchInventoryQuantity = async () => {
        try {
          const response = await axios.get('https://8080-aedecebfbdffcfaddeebcaddaceaeaadbdbabf.project.examly.io/inventory/total-quantity');
          console.log(quantity);
          setQuantity(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchSalesData = async () => {
        try {
          const response = await axios.get('https://8080-aedecebfbdffcfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/getall');
          setSalesData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      const value= salesData.length; // calculating the length of the array for last three orders
      console.log(value);

  return (
  <>
    <NavbarComp/>
    <div>
    <div className='container'>
    <div className='py-4'>
      <div style={{
       marginLeft:'60%',
       marginTop:'45%'
      }}>
    <h2>Recent_Orders:</h2>
    </div>
    <table style={{ 
        width: 700,
         position:'absolute',
        left:'60%',
        top:'110%'
         //left:'30%'
        }} className='table border shadow'>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((sale,index)=>{
          return(index>(value-4) &&( 
            <tr>
            <td>{sale.productname}</td>
            <td>{sale.price}</td>
            <td>{sale.quantity}</td>
            </tr>
          ))
        })}
      </tbody>
    </table>
    <h2>Inventory Level: {quantity}</h2>
    </div>
    </div>
    </div>
    </>
)}
    


export default Reports;