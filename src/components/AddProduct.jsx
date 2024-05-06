import React, { useState, useEffect, Fragment } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

//Servicios
import { Server } from "../services/server";

//Componente
import Alert from './Alert'

export default function AddProduct(props) {

    const server = new Server();

    const [openAlertError, setOpenAlertError] = useState(false);
    const [cantidadPedido, setCantidadPedido] = useState(1);
    const [precioUnit, setPrecioUnit] = useState(props.precioXMenor)
    const [titlePrecio, setTitlePrecio] = useState('Precio (S/.'+props.precioXMenor +" - S/."+props.precioXMayor+")")
    const [msjError, setMsjError] = useState('');

    const handleClose = () => {
        props.setOpenAddProduct(false);
    };

    async function handleAddproduct() {
        const tokenCoquito = window.localStorage.getItem('loggedCoquito')
        var cartMemory  =  window.localStorage.getItem('cartMemory')!=null?JSON.parse(window.localStorage.getItem('cartMemory')):[]
        if (tokenCoquito && tokenCoquito.length>2){
            var dataFormAddProduct = {
                id_user: tokenCoquito.substring(2,tokenCoquito.length-1),
                id_producto: props.idProducto,
                descripcion_producto: props.nombreProduct,
                precio_unit: precioUnit,
                cantidad: cantidadPedido,
                rango_precio: "S/."+ props.precioXMenor+ " - S/." + props.precioXMayor,
                stock: props.stokActual
            }
            //const addCartResponse =  await server.addProductToCart(dataFormAddProduct);
            cartMemory = cartMemory.concat(dataFormAddProduct)
            window.localStorage.setItem(
                'cartMemory' , JSON.stringify(cartMemory)
            )
            setOpenAlertError(false)
            props.setMsjAlertExitoso("Agregado correctamente")
            props.setSeverityAlert('success')
            props.setOpenAlertOk(true)
            props.setCantidadCart(cartMemory.length)
            handleClose()
        }
    }
    return(
        <Fragment>
            <DialogTitle>Agregar producto a carrito</DialogTitle>
            <DialogContent style={{paddingTop:'1vh'}}>
                <Grid>
                {props.nombreProduct}
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={11} sm={6} md={6}>
                        <TextField
                                margin="dense"
                                id="cantidad"
                                label="Cantidad"
                                type="number"
                                variant="standard"
                                fullWidth
                                value={cantidadPedido}
                                onChange={(e) => setCantidadPedido(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} md={5}>
                        <TextField
                                margin="dense"
                                id="precio"
                                label={titlePrecio}
                                type="number"
                                variant="standard"
                                fullWidth
                                defaultValue={props.precioXMenor}
                                onChange={(e) => setPrecioUnit(e.target.value)}
                        />
                    </Grid>
                </Grid>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={handleAddproduct} variant="contained" >Aceptar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje="Error al seleccionar" severity="error"/>
        </Fragment>
    );
}