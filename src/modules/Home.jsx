import React, { useState, useEffect } from "react";


export default function Home(props) {

    useEffect(() => {
        if (props.mobileOpen == true) {
            props.onDrawerToggle()
        }
    }, [,]);


}