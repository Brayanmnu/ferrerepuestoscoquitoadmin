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

export default function VentasModalAnular(props) {

    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);

    async function anularRecibo() {
        const reciboResponse =  await server.anularRecibo(props.idComprobante);
        if (reciboResponse.status === 200){
            const reciboResponseData = await reciboResponse.data; 
            if(reciboResponseData.status==="anulado"){
                setOpenAlertError(false)
                props.setOpenAlertOk(true);
                props.setMsjAlertExitoso("Anulado correctamente")
                props.setSeverityAlert('warning')
                props.reloadAllVentas(0) 
                handleClose()
            }else{
                setOpenAlertError(true)
            }
        }else{
            setOpenAlertError(true)
        }
    }

    
    const handleClose = () => {
        props.setOpenAnular(false);
    };
    
    
    return(
        <Fragment>
            <DialogTitle>Anular recibo</DialogTitle>
            <DialogContent>
                ¿Está seguro que desea anular el recibo?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={anularRecibo} variant="contained" >Aceptar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al anular" severity="error"/>
        </Fragment>
    );
}