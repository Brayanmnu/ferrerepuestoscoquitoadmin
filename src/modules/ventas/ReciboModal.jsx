import React, { useState, useEffect, Fragment } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//componente
import Alert from '../../components/Alert'
export default function ReciboModal(props) {

    const [cantidad, setCantidad] = useState(props.productoSelect.cantidad);
    const [precioUnit, setPrecioUnit] = useState(props.productoSelect.precio_unit);
    const [openAlertError, setOpenAlertError] = useState(false);
    const [msjError, setMsjError] = useState('');

    const handleClose = () => {
        props.setOpenEdit(false);
    };

    async function editProduct() {
        try {
            let productsEdit = props.productos
            let dataFormProduct = props.productoSelect
            dataFormProduct.cantidad = cantidad
            dataFormProduct.precio_unit = precioUnit

            productsEdit = productsEdit.map(p => p.id_producto !== dataFormProduct.id_producto ? p : dataFormProduct);
            window.localStorage.setItem(
                'cartMemory', JSON.stringify(productsEdit)
            )

            setOpenAlertError(false)
            props.setMsjAlertExitoso("Actualizado correctamente")
            props.setSeverityAlert('success')
            props.setOpenAlertOk(true);
            props.reloadAllProducts()
            handleClose()
        } catch (error) {
            setMsjError('Error al actualizar')
            setOpenAlertError(true);
        }
    }

    useEffect(() => {

    }, [,]);


    return (
        <Fragment>
            <DialogTitle>Modificación de producto</DialogTitle>
            <DialogContent style={{ paddingTop: '1vh' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        {props.productoSelect.descripcion_producto}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        Rango de precio: S/. {props.productoSelect.rango_precio}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        Stok actual: {props.productoSelect.stock}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            margin="dense"
                            id="cantidad"
                            label="Cantidad"
                            type="number"
                            variant="standard"
                            fullWidth
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            inputProps={{
                                min: 0
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            margin="dense"
                            id="precioUnit"
                            label="P. Unitario"
                            type="number"
                            variant="standard"
                            fullWidth
                            value={precioUnit}
                            onChange={(e) => setPrecioUnit(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={editProduct} variant="contained" >Guardar</Button>
            </DialogActions>

            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje={msjError} severity="error" />
        </Fragment>
    );
}