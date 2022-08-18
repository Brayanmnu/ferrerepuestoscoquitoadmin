import React, { useState, useEffect, Fragment } from "react";
import Dashboard from './Dashboard'
import ThemeLogin from '../components/ThemeLogin'

export default function Login() {
    const[isLogin, setIsLogin] = React.useState(false);
    
    useEffect(() => {
        const loggedCoquitoJSON = window.localStorage.getItem('loggedCoquito')
        if(loggedCoquitoJSON){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    }, [isLogin]);
    

    return isLogin? <Dashboard setIsLogin={setIsLogin}/> : <ThemeLogin setIsLogin={setIsLogin}/>;
}