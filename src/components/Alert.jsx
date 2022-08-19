import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Alert(props) {

    const handleCloseAlert = (event) => {
        props.setOpenAlert(false);
    };
    return(
        <Snackbar open={props.openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
            <MuiAlert onClose={handleCloseAlert} severity={props.severity} sx={{ width: '100%' }}>
                {props.mensaje}
            </MuiAlert>
        </Snackbar>
    )
    
}
