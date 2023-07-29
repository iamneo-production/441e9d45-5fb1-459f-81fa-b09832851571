import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import 'bootstrap/dist/css/bootstrap.css';

function Login_And_Signup_Page() {

  const navigate=useNavigate();
  return (
    <div style={styles.logintext}>
        <h1>Please Login and Sign up to Continue</h1>
        <button onClick={()=> navigate('/login')} className='btn btn-primary'>Login</button>
        <button onClick={()=> navigate('/signup')} className='btn btn-primary'>Signup</button>
        
         </div>
  )
}

const styles = {
    logintext: {
        fontStyle:'italic',
        fontSize:'35px',
        maxWidth: '700px',
        margin:'auto',
        height:'75vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
}

export default Login_And_Signup_Page