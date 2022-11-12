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

export default function SocioClaveModalEliminar(props) {

    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);

    async function eliminarSocio() {
        const socioResponse =  await server.deleteSocio(props.idSocio);
        if (socioResponse.status === 200){
            const socioResponseData = await socioResponse.data; 
            if(socioResponseData.status==="eliminacion logica"){
                setOpenAlertError(false)
                props.setOpenAlertOk(true);
                props.setMsjAlertExitoso("Eliminado correctamente")
                props.setSeverityAlert('warning')
                props.reloadAllSocioClave(0) 
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
            <DialogTitle>Eliminar socio</DialogTitle>
            <DialogContent>
                ¿Está seguro que desea eliminar el socio?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={eliminarSocio} variant="contained" >Aceptar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al eliminar" severity="error"/>
        </Fragment>
    );
}