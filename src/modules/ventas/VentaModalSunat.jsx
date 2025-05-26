import React, { useState, Fragment, useEffect } from "react";

//Imports material-ui
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Server } from "../../services/server";
import { pdf } from '@react-pdf/renderer';
import DocumentSunat from "../../components/DocumentoSunat";
import Alert from '../../components/Alert'


export default function VentaModalSunat(props) {
    const server = new Server();
    const [openAlertError, setOpenAlertError] = useState(false);
    

    const handleClose = () => {
        props.setOpenSunat(false);
    };


    async function connectSunat() {
        const responseRecibo = await server.connectSunat(props.ventaSelected.id_venta);
        if (responseRecibo.status === 200) {
            setOpenAlertError(false)
            const responseReciboData = await responseRecibo.data;
            handleDownload(responseReciboData)
        }else{
            setOpenAlertError(true);
        }
    }
    
    async function handleDownload(responseReciboData) {
        const blob = await pdf(<DocumentSunat recibo={responseReciboData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'coquito - '+responseReciboData.numeracion+".pdf"; // Cambia el nombre del archivo aquí
        link.click();
        URL.revokeObjectURL(url); // Limpia el objeto URL temporal
    };

    return (
        <Fragment>
            <DialogTitle>¿Está seguro que desea emitir el documento en SUNAT?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="info">Cancelar</Button>
                <Button onClick={connectSunat} variant="contained" color="success" >Aceptar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al generar documento" severity="error" />
        </Fragment>
    );
}