import NavbarComp from './NavbarComp';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillBagFill } from 'react-icons/bs';
import { MdRecentActors } from 'react-icons/md';



function Reports() {

    const[quantity,setQuantity]=useState(0); 
    const[salesData,setSalesData]= useState([]);
    const [query,setQuery]=useState('');

    useEffect(()=>{
        fetchInventoryQuantity();
        fetchSalesData();
    },[])

    const [sortBy, setSortBy] = useState('id'); 

  const handleSortBy = (option) => {
    setSortBy(option);
    const sortedOrders = [...salesData]; 

    switch (option) {
      case 'productname':
        sortedOrders.sort((a, b) => a.productname.localeCompare(b.productname));
        break;
      case 'price':
        sortedOrders.sort((a, b) => a.price - b.price);
        break;
      case 'quantity':
        sortedOrders.sort((a, b) => a.quantity - b.quantity);
        break;  
      default:
        break;
    }
    setSalesData(sortedOrders); 
  };


    const fetchInventoryQuantity = async () => {
        try {
          const response = await axios.get('https://8080-aedecebfbdffcfaddeebcaddacebceecbecadec.project.examly.io/inventory/total-quantity');
          console.log(quantity);
          setQuantity(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchSalesData = async () => {
        try {
          const response = await axios.get('https://8080-aedecebfbdffcfaddeebcaddacebceecbecadec.project.examly.io/sales/getall');
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
       //marginLeft:'60%',
       //marginTop:'45%'
      }}>
    <h1> <MdRecentActors /> Recent Sales Orders:</h1>
    </div>
    <div className='mb-3 d-flex justify-content-end'>
            <input
                  type='text'
                  className='search'
                  placeholder='Search order'
                  onChange={(event)=>setQuery(event.target.value.toLowerCase())}
                  ></input>
          <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button' id='sortByButton' data-bs-toggle='dropdown' aria-expanded='false'>
                  Sort By
                </button>
                <ul className='dropdown-menu' aria-labelledby='sortByButton'>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('productname')}>Product Name</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('quantity')}>Quantity</button></li>
                  <li><button className='dropdown-item' onClick={() => handleSortBy('price')}>Price</button></li>
                </ul>
              </div>
              </div>
    <table style={{ 
      //  width: 700,
       //  position:'absolute',
       // left:'60%',
       // top:'110%'
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
        {salesData.filter(
                  (order)=>order.productname.toLowerCase().includes(query) ||
                  order.quantity.toString().includes(query) ||
                  order.price.toString().includes(query) 
                  ).map((sale, index) => {
          return(index>(value-4) &&( 
            <tr>
            <td>{sale.productname}</td>
            <td>{sale.quantity}</td>
            <td>{sale.price}</td>
            </tr>
          ))
        })}
      </tbody>
    </table>
    <h1>
    <BsFillBagFill /> 
      Inventory Level: {quantity}</h1>
    </div>
    </div>
    </div>
    
    </>
)}
    
export default Reports;


// import NavbarComp from './NavbarComp';
// import React, { useEffect, useState } from 'react';
// import {
//   ShoppingOutlined,
  
// } from "@ant-design/icons";
// import { Card, Space, Statistic } from "antd";
// import axios from 'axios';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
//   } from "chart.js";
//   import { Pie } from "react-chartjs-2";
  
//   ChartJS.register(
//    ArcElement,
//    Tooltip,
//    Legend
//   );
// function Reports() {

//     const[quantity,setQuantity]=useState(0); 
//     const[salesData,setSalesData]= useState([]);
//     useEffect(()=>{
//         fetchInventoryQuantity();
//         fetchSalesData();
//     },[])


//     const fetchInventoryQuantity = async () => {
//         try {
//           const response = await axios.get('https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/inventory/total-quantity');
//           console.log(quantity);
//           setQuantity(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       const fetchSalesData = async () => {
//         try {
//           const response = await axios.get('https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/sales/getall');
//           setSalesData(response.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       const value= salesData.length; // calculating the length of the array for last three orders
//       console.log(value);

//   return (
//     <>
//     <NavbarComp/>
//     {/* <h1 style={{textAlign:'center'}}>Reports</h1> */}
//     <div >
//     <Space size={20} style={{
//       position:'absolute',
//       top:'10%',
//       left:'50%'
//     }}>
//     <DashboardCard
//           icon={
//             <ShoppingOutlined
//               style={{
//                 color: "blue",
//                 backgroundColor: "rgba(0,0,255,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,

//               }}
//             />
//           }
//           title={"Inventory Level"}
//           value={quantity}
//           />
//           </Space>
//           </div>
//     <Space className="icons"
//       style={{
//         position: "absolute",
//         left:'40%',
//         marginTop:'2%'
//       }}
//       >
//     <div className='container'>
//     <div className='py-4'>
//       <div style={{
//        marginLeft:'60%',
//        marginTop:'45%'
//       }}>
//     <h2>Recent_Orders:</h2>
//     </div>
//     <table style={{ 
//         width: 700,
//          position:'absolute',
//         left:'60%',
//         top:'110%'
//          //left:'30%'
//         }} className='table border shadow'>
//       <thead>
//         <tr>
//           <th>Product Name</th>
//           <th>Quantity</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {salesData.map((sale,index)=>{
//           return(index>(value-4) &&( 
//             <tr>
//             <td>{sale.productname}</td>
//             <td>{sale.price}</td>
//             <td>{sale.quantity}</td>
//             </tr>
//           ))
//         })}
//       </tbody>
//     </table>
//     <Piegraph/>
//     </div>
//     </div>
//     </Space>
//     </>
//   )
// }

// function DashboardCard({ title, value, icon }) {
//   return (
    
//     <Card size={20} style={{
//       color:'red'
//     }}>
//       <Space  direction="horizontal">
//         {icon}
//         <Statistic title={title} value={value} />
//       </Space>
//     </Card>
//   );
// }

// function Piegraph() {
//   const [data, setData] = useState({
//     datasets: [
//       {
//         data: [],
//         backgroundColor: ['MediumSeaGreen', 'plum', 'aqua', 'powderblue'],
//       },
//     ],
//     labels: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://8080-ebffcebdfaddeebcaddaceaeaadbdbabf.project.examly.io/inventory');
//         const res = response.data;
//         console.log('resss', res);
//         const labels = [];
//         const chartData = [];
//         for (const i of res) {
//           const label = `Product: ${i.product.name}`;
//           labels.push(label);
//           chartData.push(i.quantity);
//         }
//         setData({
//           datasets: [
//             {
//               data: chartData,
//               backgroundColor: ['MediumSeaGreen', 'plum', '#461959', 'powderblue','aqua','cyan','#F1C27B','#116D6E',
//             '#C69749','#8B9A46'],
//             },
//           ],
//           labels: labels,
//         });
//       } catch (error) {
//         console.log('error', error);
//       }
//     };
//     fetchData();
//   }, []);
//     return (
//       <>
//       <Card 
//       style={{ 
//         width: 500, 
//         height: 400,
//         position:'absolute',
//         right:'130%',
//         top:'90%'
//          }}>
//             <h2 style={{textAlign:"center"}}>Inventory Graph</h2>
//       <div className="App" style={{width:'60%', height:'70%'}}>
//         <Pie 
//         style={{
//                 position:'absolute',
//                 left:'20%',
//                 }}
//           data={data}/>
//       </div>
//       </Card>
//       </>
//     );
//   }
  

// export default Reports;