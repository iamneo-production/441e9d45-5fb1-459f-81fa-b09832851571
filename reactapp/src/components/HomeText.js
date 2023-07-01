import React from 'react'


function HomeText() {
  return (
    <div style={styles.hometext}>
        <h1>Welcome To Inventory Management System</h1>
        <button type="submit" className='btn btn-primary'>Login</button>
        <button type="submit" className='btn btn-primary'>Signup</button>
        
        </div>
  )
}

const styles = {
    hometext: {
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

export default HomeText