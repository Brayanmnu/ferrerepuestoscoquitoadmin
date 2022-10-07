import React, { useState, Fragment} from "react";
//Imports material-ui
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

//Servicios
import { Server } from "../../services/server";

//Componente
import Alert from '../../components/Alert'

export default function ProductAdminModalEliminar(props) {

    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);

    async function eliminarProducto() {
        const productoResponse =  await server.deleteProductBack(props.idProducto);
        if (productoResponse.status === 200){
            const productoResponseData = await productoResponse.data; 
            if(productoResponseData.status==="eliminacion logica"){
                setOpenAlertError(false)
                props.setOpenAlertOk(true);
                props.setMsjAlertExitoso("Eliminado correctamente")
                props.setSeverityAlert('warning')
                props.reloadAllProducts()
                handleClose()
            }else{
                setOpenAlertError(true)
            }
        }else{
            setOpenAlertError(true)
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
            <Alert openAlert={false} setOpenAlert={setOpenAlertError} mensaje="Error al eliminar" severity="error"/>
        </Fragment>
    );
}