import React from 'react'


//isLoggedIn=>

export const isLoggedInn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
  };
  
  //doLogin=> data=>set to localstorage
  
  export const doLogin = (data,next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next()
  };
  
  //doLogout=> remove from localStorage
  
  export const doLogout = (next) => {
    localStorage.removeItem("data");
  };
  
  //get currentUser
  export const getCurrentUserDetail = () => {
    if (isLoggedInn()) {
      return JSON.parse(localStorage.getItem("data")).user;
    } else {
      return undefined;
    }
  };
  