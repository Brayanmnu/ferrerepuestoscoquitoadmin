import React, { useState, Fragment, useEffect } from "react";
//Imports material-ui
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import DocumentDevolucion from "../../components/DocumentDevolucion";
import { pdf } from '@react-pdf/renderer';

//Servicios
import { Server } from "../../services/server";

//Componente
import Alert from '../../components/Alert'

export default function VentasModalAnular(props) {
    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);
    const [responseReciboData, setResponseReciboData] = useState();
    const [isAnulacionTotal, setIsAnulacionTotal] = useState(false);
    const [mercaderiaSelected, setMercaderiaSelected] = useState([]);
    const [processAnulacion, setProcessAnulacion] = useState(false);

    useEffect(() => {
        reloadDetail()
    }, []);


    const handleCheckboxChange = (event, item) => {
        if (event.target.checked) {
            const updatedProductos = responseReciboData.productos.map(producto => {
                if (producto.id_detalle_venta === item) {
                    return { ...producto, checked: true, cantidad_devolucion: '' }; // Actualizamos la cantidad
                }
                return producto; // Devolvemos el producto sin modificar si no coincide el ID
            });
            setMercaderiaSelected([...mercaderiaSelected, item]);
            setResponseReciboData({ ...responseReciboData, productos: updatedProductos });
        } else {
            const updatedProductos = responseReciboData.productos.map(producto => {
                if (producto.id_detalle_venta === item) {
                    return { ...producto, checked: false, cantidad_devolucion: '' }; // Actualizamos la cantidad
                }
                return producto; // Devolvemos el producto sin modificar si no coincide el ID
            });
            setMercaderiaSelected(mercaderiaSelected.filter(selectedItem => selectedItem !== item));
            setResponseReciboData({ ...responseReciboData, productos: updatedProductos });
        }
    };


    const handleChangeCantidad = (value, reciboId, cantidad) => {
        if (value < 1 || value > cantidad) {
            value = '';
        }
        // if (value > 0 && value < cantidad) {
        const updatedProductos = responseReciboData.productos.map(producto => {
            if (producto.id_detalle_venta === reciboId) {
                return { ...producto, cantidad_devolucion: value }; // Actualizamos la cantidad
            }
            return producto; // Devolvemos el producto sin modificar si no coincide el ID
        });

        // Actualizamos el estado con los productos actualizados
        setResponseReciboData({ ...responseReciboData, productos: updatedProductos });
        // }
    };


    async function reloadDetail() {
        const responseRecibo = await server.getDetailVenta(props.ventaSelected.id_venta);
        if (responseRecibo.status === 200) {
            const responseReciboDataPrivate = await responseRecibo.data;
            setResponseReciboData(responseReciboDataPrivate)
        }
    }


    const handleClose = () => {
        props.setOpenAnular(false);
    };

    const handleChangeTotal = (event) => {
        setIsAnulacionTotal(event.target.checked);
        setMercaderiaSelected([]);
    };

    async function handleDownload(responseDevolucionData) {
        const blob = await pdf(<DocumentDevolucion devolucion={responseDevolucionData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'devolucion - ' + responseDevolucionData.nro_devolucion + ".pdf"; // Cambia el nombre del archivo aquí
        link.click();
        URL.revokeObjectURL(url); // Limpia el objeto URL temporal
    };

    async function anularRecibo() {
        setProcessAnulacion(true);
        var idVenta;
        if (isAnulacionTotal) {
            idVenta = responseReciboData.productos[0].id_venta;
            const responseDevolucion = await server.anulacionRecibo(idVenta);
            if (responseDevolucion.status === 200) {
                props.setFiltroApply(!props.filtroApply)
                setOpenAlertError(false)
                props.setMsjAlertExitoso("Anulado correctamente")
                props.setSeverityAlert('success')
                props.setOpenAlertOk(true);
                handleClose()
            }
            setProcessAnulacion(false);
        } else {
            const tokenCoquito = window.localStorage.getItem('loggedCoquito')
            var productosDevolucionData = []
            var isError = false;
            var montoTotal = 0;
            responseReciboData.productos.map(producto => {
                if (producto.checked) {
                    if ('cantidad_devolucion' in producto && producto.cantidad_devolucion != '') {
                        idVenta = producto.id_venta
                        montoTotal += parseFloat(producto.precio_unit) * parseFloat(producto.cantidad_devolucion);
                        productosDevolucionData.push({
                            id_detalle_venta: producto.id_detalle_venta,
                            cantidad: producto.cantidad_devolucion,
                            descripcion_producto: producto.descripcion_producto,
                            id_producto: producto.id_producto,
                            precio_unit: producto.precio_unit
                        })

                    } else {
                        isError = true;
                    }

                }
            });

            if (isError) {
                setOpenAlertError(true);
                props.setMsjAlertExitoso("Falta ingresar la cantidad")
                props.setSeverityAlert('warning')
                props.setOpenAlertOk(true);
            } else {
                const devolucionBody = {
                    id_venta: idVenta,
                    id_persona: tokenCoquito.substring(2, tokenCoquito.length - 1),
                    productos: productosDevolucionData,
                    monto_total: montoTotal
                }
                const responseDevolucion = await server.devolucionRecibo(devolucionBody);
                if (responseDevolucion.status === 200) {
                    const responseDevolucionData = responseDevolucion.data;
                    // let responseDevolucionData = responseDevolucionData1;
                    responseDevolucionData['nro_doc'] = responseReciboData.nro_doc
                    responseDevolucionData['nombres_razon'] = responseReciboData.nombres_razon
                    var sumaSubTotalLocal = Math.round((responseDevolucionData.total / 1.18) * 100) / 100
                    responseDevolucionData['sub_total'] = sumaSubTotalLocal
                    responseDevolucionData['igv'] = Math.round((responseDevolucionData.total - sumaSubTotalLocal) * 100) / 100

                    handleDownload(responseDevolucionData)

                    props.setFiltroApply(!props.filtroApply)
                    setOpenAlertError(false)
                    props.setMsjAlertExitoso("Devolución generada correctamente")
                    props.setSeverityAlert('success')
                    props.setOpenAlertOk(true);
                    handleClose()
                }
                
            }
            setProcessAnulacion(false);
        }

    }

    return (
        <Fragment>
            <DialogTitle>Devolución Venta</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Checkbox
                            disabled={responseReciboData? responseReciboData.productos.some(p=>p.estado===2):true}
                            checked={isAnulacionTotal}
                            onChange={handleChangeTotal}
                            inputProps={{ 'aria-label': 'controlled' }}
                        /> ¿Anulación Total?
                    </Grid>
                    {/* {bodyAnulacion} */}
                    <Grid item xs={12} sm={12} md={12}>
                        {responseReciboData ? responseReciboData.productos.map((recibo) => {
                            return (
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>

                                    {
                                        recibo.estado == 2 ? <Grid item xs={9} sm={10} md={10} style={{ alignItems: 'center', display: 'flex' }}> <br />{recibo.cantidad} {recibo.descripcion_producto} </Grid> :
                                            <Grid item xs={9} sm={10} md={10}>
                                                <Checkbox checked={mercaderiaSelected.includes(recibo.id_detalle_venta)} disabled={recibo.estado == 2 || isAnulacionTotal} onChange={(event) => handleCheckboxChange(event, recibo.id_detalle_venta)} />{recibo.cantidad} {recibo.descripcion_producto}
                                            </Grid>
                                    }

                                    <Grid item xs={3} sm={2} md={2}>
                                        {
                                            recibo.estado == 2 ? <div style={{ alignItems: 'center', display: 'flex', color: 'red' }}> <br /> DEVUELTO</div> :
                                                <TextField
                                                    disabled={!recibo.checked || !mercaderiaSelected.includes(recibo.id_detalle_venta)}
                                                    margin="dense"
                                                    id="cantidadNew"
                                                    label="Devolución"
                                                    type="number"
                                                    variant="standard"
                                                    fullWidth
                                                    value={recibo.cantidad_devolucion}
                                                    onChange={(event) => handleChangeCantidad(event.target.value, recibo.id_detalle_venta, recibo.cantidad)}
                                                    inputProps={{
                                                        min: 0,
                                                        max: recibo.cantidad
                                                    }}
                                                />
                                        }

                                    </Grid>
                                </Grid>

                            )
                        }) : ''
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button disabled={processAnulacion || !isAnulacionTotal && mercaderiaSelected.length == 0} onClick={anularRecibo} variant="contained" >Aceptar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al anular" severity="error" />
        </Fragment>
    );
}