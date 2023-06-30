import React from 'react'

function HomeText() {
  return (
    <div style={styles.hometext}>
        Welcome To Inventory Management System</div>
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