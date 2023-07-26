import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComp from './NavbarComp';
function WelcomePage() {
  return (
    <>
    <NavbarComp />
    <h1 style={styles.welcometext}>Welcome To IMS</h1>

    </>
  )
}
const styles = {
    welcometext: {
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


export default WelcomePage