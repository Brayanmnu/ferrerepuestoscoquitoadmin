import React, { useState, useEffect, Fragment } from "react";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';


export default function SearchComponent(props) {
    
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <FilterAltIcon color="inherit" sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: 'default' },
                            }}
                            variant="standard"
                            value = {props.textSearch}
                            onChange={(e) => props.setTextSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Search" onClick={props.searchChange}>
                            <IconButton>
                                <SearchIcon color="inherit" sx={{ display: 'block' }}  />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Reload">
                            <IconButton onClick={props.reloadAllProducts}>
                                <RefreshIcon color="inherit" sx={{ display: 'block' }}  />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
