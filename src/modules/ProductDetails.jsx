import React, { useState, useEffect, Fragment } from "react";
import Grid from '@mui/material/Grid';
import {useParams } from 'react-router-dom'
import { ProductoService } from "../services/ProductoService";
import { UnidadMedidaService } from "../services/UnidadMedidaService";
import { TipoProductoService } from "../services/TipoProductoService";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function ProductDetails(props) {
    const productoService = new ProductoService();
    const unidadMedidaService = new UnidadMedidaService();
    const tipoProductoService = new TipoProductoService();

    const { idProduct } = useParams()
    const [tipoProducto, setTipoProducto] = useState();
    const [nombre, setNombre] = useState();
    const [descripcion, setDescripcion] = useState();
    const [precioCompra, setPrecioCompra] = useState();
    const [precioVentaMenor, setPrecioVentaMenor] = useState();
    const [precioVentaMayor, setPrecioVentaMayor] = useState();
    const [stock, setStock] = useState();
    const [unidadMedida, setUnidadMedida] = useState();

    async function reloadUnidadMedida(id) {
        const dataUnidadMedida =  await unidadMedidaService.getUnidadMedidaById(id);
        if (dataUnidadMedida.status === 200){
            const contentUnidad = await dataUnidadMedida.data;
            setUnidadMedida(contentUnidad.descripcion)
        }
    }

    
    async function reloadTipoProducto(id) {
        const dataTipoProducto =  await tipoProductoService.getTipoProductoById(id);
        if (dataTipoProducto.status === 200){
            const contentTipo = await dataTipoProducto.data;
            setTipoProducto(contentTipo.descripcion)
        }
    }

    async function reloadProduct() {
        const dataProduct =  await productoService.getProductoById(idProduct);
        if (dataProduct.status === 200){
            const contentProduct = await dataProduct.data;
            reloadTipoProducto(contentProduct.id_tipo_producto)
            setNombre(contentProduct.nombre)
            setDescripcion(contentProduct.descripcion)
            setPrecioCompra(contentProduct.precio_compra)
            setPrecioVentaMenor(contentProduct.precio_venta_menor)
            setPrecioVentaMayor(contentProduct.precio_venta_mayor)
            setStock(contentProduct.stock)
            reloadUnidadMedida(contentProduct.id_unidad_medida)
            
        }
    }
    useEffect(() => {
        props.setIsDetails(false)
        reloadProduct();
    }, [,]);
    
    return (
    <Fragment>
        <Box>
            <Typography variant="caption" display="block" >
                {tipoProducto}
            </Typography>
            <Typography variant="h2" gutterBottom>
                {nombre}
            </Typography>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Venta X MENOR: S/ {precioVentaMenor}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Venta X MAYOR: S/ {precioVentaMayor}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Compra: S/ {precioCompra}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Typography variant="body2" gutterBottom>
                    {descripcion}
            </Typography>
        </Box>
    </Fragment>)
}