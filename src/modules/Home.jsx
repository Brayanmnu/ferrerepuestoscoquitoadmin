import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Image from '../img/home2.jpg'; // Import using relative path
import CssBaseline from '@mui/material/CssBaseline';

export default function Home(props) {

    useEffect(() => {
        if (props.mobileOpen == true) {
            props.onDrawerToggle()
        }
    }, [,]);


}