import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import ProductDetails from './modules/ProductDetails'
import Dashboard from './modules/Dashboard'
import ThemeLogin from './components/ThemeLogin'

export default function App() {
  const[isDetails, setIsDetails] = useState(true);
  const[isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //const loggedCoquitoJSON = window.localStorage.getItem('loggedCoquito')
    const loggedCoquitoJSON = true
    if(loggedCoquitoJSON){
        setIsLogin(true)
    }else{
        setIsLogin(false)
    }
  }, [isLogin]);


  return isLogin?
    <Router>
      <Routes>
        <Route path={'/products-details/:idProduct'} exact element={<ProductDetails setIsDetails={setIsDetails}/>} />
      </Routes>
        {isDetails? <Dashboard setIsLogin={setIsLogin}/> :null}
    </Router>
  :  <ThemeLogin setIsLogin={setIsLogin}/>;
}
