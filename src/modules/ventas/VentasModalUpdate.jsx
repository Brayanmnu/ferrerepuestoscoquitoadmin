import React, { useState, useEffect, Fragment } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';

//componente
import Alert from '../../components/Alert'

//Servicios
import { Server } from "../../services/server";


export default function VentasModalUpdate(props) {

    const server = new Server();

    const [sunat, setSunat] = useState(props.ventaSelected.sunat);
    const [pagado, setPagado] = useState(props.ventaSelected.is_pagado);
    const [openAlertError, setOpenAlertError] = useState(false);
    const [msjError, setMsjError] = useState('');

    const handleClose = () => {
        props.setOpenUpdate(false);
    };

    async function updateVenta() {
        const dataFormVenta = {
            is_pagado: pagado,
            sunat: sunat
        }
        const ventaResponse = await server.updateVenta(dataFormVenta, props.ventaSelected.id_venta);
        setMsjError('Error al actualizar')
        if (ventaResponse.status === 200) {
            const ventaResponseData = await ventaResponse.data;
            if (ventaResponseData.status === "actualizado") {
                setOpenAlertError(false)
                props.setMsjAlertExitoso("Actualizado correctamente")
                props.setSeverityAlert('success')
                props.setOpenAlertOk(true);
                props.setFiltroApply(!props.filtroApply)
                handleClose()
            } else {
                setOpenAlertError(true);
            }
        }
    }

        useEffect(() => {
        }, [,]);


        const handleCheckboxSunatChange = (event, item) => {
            if (event.target.checked) {
                setSunat(true);
            } else {
                setSunat(false);
            }
        };

        const handleCheckboxPagadoChange = (event, item) => {
            if (event.target.checked) {
                setPagado(true);
            } else {
                setPagado(false);
            }
        };

        return (
            <Fragment>
                <DialogTitle>Actualización de Venta</DialogTitle>
                <DialogContent style={{ paddingTop: '1vh' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {
                            props.ventaSelected.tipo_comprobante != "Recibo" ?
                                <Grid item xs={12} sm={12} md={12}>
                                    <Checkbox color="info" checked={sunat} onChange={(event) => handleCheckboxSunatChange(event)} />
                                    Sunat
                                </Grid> : null
                        }

                        <Grid item xs={12} sm={12} md={12}>
                            <Checkbox color="info" checked={pagado} onChange={(event) => handleCheckboxPagadoChange(event)} />
                            Pagado
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                    <Button onClick={updateVenta} variant="contained" >Guardar</Button>
                </DialogActions>

                <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje={msjError} severity="error" />
            </Fragment>
        );
}