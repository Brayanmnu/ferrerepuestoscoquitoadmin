import React, { useState, useEffect, Fragment } from "react";
import Grid from '@mui/material/Grid';
import {useParams } from 'react-router-dom'
import { Server } from "../services/server";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function ProductDetails(props) {
    const server = new Server();

    const { idProduct } = useParams()
    const [nombre, setNombre] = useState();
    const [precioCompra, setPrecioCompra] = useState();
    const [precioVentaMenor, setPrecioVentaMenor] = useState();
    const [precioVentaMayor, setPrecioVentaMayor] = useState();
    const [stock, setStock] = useState();
    const [unidadMedida, setUnidadMedida] = useState();

    async function reloadProduct() {
        const dataProduct =  await server.getProductoDetailById(idProduct);
        if (dataProduct.status === 200){
            const contentProduct = await dataProduct.data;
            setNombre(contentProduct.nombre)
            setPrecioCompra(contentProduct.precio_compra)
            setPrecioVentaMenor(contentProduct.precio_venta_menor)
            setPrecioVentaMayor(contentProduct.precio_venta_mayor)
            setStock(contentProduct.stock)
            setUnidadMedida(contentProduct.uni_medida)
            
        }
    }
    useEffect(() => {
        props.setIsDetails(false)
        reloadProduct();
    }, [,]);
    
    return (
    <Fragment>
        <Box>
            <Typography variant="h2" gutterBottom>
                {nombre}
            </Typography>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6" gutterBottom>
                        Stock: {stock} {unidadMedida}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6" gutterBottom>
                        Rango de Precio Venta: S/ {precioVentaMenor} - S/ {precioVentaMayor}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6" gutterBottom>
                        Compra: S/ {precioCompra}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </Fragment>)
}