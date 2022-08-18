import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Alert(props) {

    const handleCloseError = (event) => {
        props.setOpenError(false);
    };
    return(
        <Snackbar open={props.openError} autoHideDuration={2000} onClose={handleCloseError}>
            <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                {props.mensaje}
            </MuiAlert>
        </Snackbar>
    )
    
}
