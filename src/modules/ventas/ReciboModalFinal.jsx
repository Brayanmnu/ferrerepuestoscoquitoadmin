import React, { useState, Fragment } from "react";
//Imports material-ui
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '../../components/Alert'
import CircularProgress from '@mui/material/CircularProgress';
import { Server } from "../../services/server";
import { pdf } from '@react-pdf/renderer';
import DocumentRecibo from "../../components/DocumentRecibo";
import { useNavigate } from "react-router-dom";


export default function ReciboModalFinal(props) {
    const navigate = useNavigate();
    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);
    const [isFinished, setIsFinished] = useState(1);
    const [pdfDownload, setPdfDownload] = useState();
    const [responseReciboData, setResponseReciboData] = useState();

    const handleClose = () => {
        props.setOpenModalPdf(false);
    };

    function finishDownload() {
        window.localStorage.removeItem('cartMemory');
        window.localStorage.removeItem('recibo');
        navigate("/products-dashboard/riego")
    };

    async function handleView() {
        // const blob = await pdf(<DocumentRecibo recibo={responseReciboData} />).toBlob();
        // const url = URL.createObjectURL(blob);
        // window.open(url);
        finishDownload()
    };


    async function handleDownload() {
        const blob = await pdf(<DocumentRecibo recibo={responseReciboData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recibo - ' + responseReciboData.nro_recibo + ".pdf"; // Cambia el nombre del archivo aquí
        link.click();
        URL.revokeObjectURL(url); // Limpia el objeto URL temporal
        finishDownload()
    };

    async function confirmSale() {
        setIsFinished(2);
        let dataRecibo = {
            "id_tipo_comprobante": props.tipo_comprobante,
            "nro_doc": props.nroDoc,
            "nombres_razon": props.nombresRazon,
            "telefono": props.telefono,
            "direccion": props.direccion,
            "observaciones": props.observaciones,
            "id_tipo_pago": props.tipoPago,
            "id_medio_pago": props.medioPago,
            "a_cuenta": props.aCuenta,
            "saldo": props.saldo,
            "sub_total": props.sumaSubTotal,
            "igv": props.igv,
            "total": props.sumaTotal,
            "productos": props.productos
        }
        const responseRecibo = await server.generateRecibo(dataRecibo);
        if (responseRecibo.status === 200) {
            const responseReciboData = await responseRecibo.data;
            if (responseReciboData.status === "ok") {
                setOpenAlertError(false)
                props.setMsjAlertExitoso("Recibo generado correctamente")
                props.setSeverityAlert('success')
                props.setOpenAlertOk(true);
                setResponseReciboData(responseReciboData.detail)
                setIsFinished(3);
            } else {
                setIsFinished(1)
                setOpenAlertError(true);
        }
        } else {
            setIsFinished(1)
            setOpenAlertError(true);
        }
    };

    return (
        <Fragment>
            <DialogTitle>Generación de recibo</DialogTitle>

            <DialogContent style={{ paddingTop: '1vh' }}>

                {
                    isFinished == 1 ?
                        <div>¿Está seguro que desea finalizar la venta?</div> :
                        null
                }
                {isFinished == 2 ?
                    <div>
                        Generando PDF...
                        <CircularProgress />
                    </div> : null
                }
                {isFinished == 3 ?
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        {pdfDownload}
                    </div>
                    : null
                }
            </DialogContent>
            {
                isFinished == 1 ?
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color="error">No</Button>
                        <Button onClick={confirmSale} variant="contained" color="success" >Si</Button>
                    </DialogActions> :
                    isFinished == 3 ?
                        <DialogActions>
                            <Button onClick={handleView} variant="outlined" color="info">Terminar</Button>
                            <Button onClick={handleDownload} variant="contained" color="success" >Descargar</Button>
                        </DialogActions> : null
            }
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al generar documento" severity="error" />
        </Fragment>
    );
}