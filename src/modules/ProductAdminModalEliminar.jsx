import React, { useState, Fragment} from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { ProductoService } from "../services/ProductoService";

export default function ProductAdminModalEliminar(props) {

    const productoService = new ProductoService();

    const [alertError,setAlertError] = useState('');

    async function eliminarProducto() {
        const productoResponse =  await productoService.deleteProductBack(props.idProducto);
        if (productoResponse.status === 200){
            const productoResponseData = await productoResponse.data; 
            if(productoResponseData.status==="eliminado"){
                props.setAlertOk(<Alert severity="success">Eliminado correctamente</Alert>);
                handleClose()
            }else{
                setAlertError(<Alert severity="error">Error al eliminar</Alert>)
            }
        }else{
            setAlertError(<Alert severity="error">Error al eliminar</Alert>)
        }
    }

    
    const handleClose = () => {
        props.setOpenDelete(false);
    };
    
    
    return(
        <Fragment>
            <DialogTitle>Eliminar producto</DialogTitle>
            <DialogContent>
                ¿Está seguro que desea eliminar el producto?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={eliminarProducto} variant="contained" >Aceptar</Button>
            </DialogActions>
            {alertError}
        </Fragment>
    );
}