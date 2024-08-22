import React, { useState, Fragment, useEffect } from "react";

//Imports material-ui
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Server } from "../../services/server";
import { pdf } from '@react-pdf/renderer';
import DocumentRecibo from "../../components/DocumentRecibo";

export default function VentaModalDetalle(props) {
    const server = new Server();
    const [responseReciboData, setResponseReciboData] = useState();

    useEffect(() => {
        reloadDetail()
    }, []);

    async function reloadDetail() {
        const responseRecibo = await server.getDetailVenta(props.ventaSelected.id_venta);
        if (responseRecibo.status === 200) {
            const responseReciboDataPrivate = await responseRecibo.data;
            setResponseReciboData(responseReciboDataPrivate)
        }
    }
    async function handleView() {
        const blob = await pdf(<DocumentRecibo recibo={responseReciboData} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    async function handleDownload() {
        const blob = await pdf(<DocumentRecibo recibo={responseReciboData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recibo - '+responseReciboData.nro_recibo+".pdf"; // Cambia el nombre del archivo aquí
        link.click();
        URL.revokeObjectURL(url); // Limpia el objeto URL temporal
    };

    return (
        <Fragment>
            <DialogTitle>Detalle de Recibo</DialogTitle>
            <DialogActions>
                <Button onClick={handleView} variant="outlined" color="info">Visualizar</Button>
                <Button onClick={handleDownload} variant="contained" color="success" >Descargar</Button>
            </DialogActions>
        </Fragment>
    );
}