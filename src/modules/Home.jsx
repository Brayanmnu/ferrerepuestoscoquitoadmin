import React, { useState, useEffect } from "react";
import Image from '../img/login.jpg'; // Import using relative path
import Grid from '@mui/material/Grid';


export default function Home(props) {

    useEffect(() => {
        if (props.mobileOpen == true) {
            props.onDrawerToggle()
        }
    }, [,]);

    return (
        <Grid container component="main" sx={{ height: '80vh' }}>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    backgroundImage: `url(${Image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    )

}