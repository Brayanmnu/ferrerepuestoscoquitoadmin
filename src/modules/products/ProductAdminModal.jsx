import React, { useState, useEffect, Fragment } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//import Alert from '@mui/material/Alert';

//Servicios
import { ProductoService } from "../../services/ProductoService";
import { UnidadMedidaService } from "../../services/UnidadMedidaService";
import { TipoProductoService } from "../../services/TipoProductoService";

//componente
import Alert from '../../components/Alert'
export default function ProductAdminModal(props) {

    const productoService = new ProductoService();
    const unidadMedidaService = new UnidadMedidaService();
    const tipoProductoService = new TipoProductoService();

    const [tipoProducto, setTipoProducto] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVentaMenor, setPrecioVentaMenor] = useState('');
    const [precioVentaMayor, setPrecioVentaMayor] = useState('');
    const [stock, setStock] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');

    const [menuItemProducto, setMenuItemProducto] = useState('');
    const [menuItemUnidadMedida, setMenuItemUnidadMedida] = useState('');

    const [openAlertError, setOpenAlertError] = useState(false);
    const [msjError, setMsjError] = useState('');

    
    var arrayTipoProducto = []
    var arrayUnidadMedida = []

    const handleClose = () => {
        props.setOpenCreate(false);
    };
    
    const handleChangeTipoProducto = (event) => {
        setTipoProducto(event.target.value);
    };
    const handleChangeUnidadMedida = (event) => {
        setUnidadMedida(event.target.value);
    };

    async function reloadDataById(idProduct) {
        const productoResponse =  await productoService.getProductoById(idProduct);
        if (productoResponse.status === 200){
            const productoResponseData = await productoResponse.data;
            setTipoProducto(productoResponseData.id_tipo_producto);
            setNombre(productoResponseData.nombre)
            setDescripcion(productoResponseData.descripcion)
            setPrecioCompra(productoResponseData.precio_compra)
            setPrecioVentaMenor(productoResponseData.precio_venta_menor)
            setPrecioVentaMayor(productoResponseData.precio_venta_mayor)
            setStock(productoResponseData.stock)
            setUnidadMedida(productoResponseData.id_unidad_medida)
        }
    }
    async function reloadDataConfig() {
        const tipoProductoResponse =  await tipoProductoService.getAllTipoProducto();
        arrayTipoProducto = await tipoProductoResponse.data;
        setMenuItemProducto(
            arrayTipoProducto.map((tp) => {
                return(
                    <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                )
                
            })
        )
        const undidadMedidaResponse =  await unidadMedidaService.getAllUnidadMedida();
        arrayUnidadMedida = await undidadMedidaResponse.data;
        setMenuItemUnidadMedida(
            arrayUnidadMedida.map((um) => {
                return(
                    <MenuItem value={um.id}>{um.descripcion}</MenuItem>
                )
            })
        )

        if(props.isCreate===false){
            await reloadDataById(props.idProducto)
        }
    }
    async function createProduct() {
        

        var dataFormProduct = {
            id_tipo_producto: tipoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio_compra: precioCompra,
            precio_venta_menor: precioVentaMenor,
            precio_venta_mayor: precioVentaMayor,
            stock: stock,
            id_unidad_medida:unidadMedida
        }

        if(props.isCreate){
            const productoResponse =  await productoService.createProductBack(dataFormProduct);
            setMsjError('Error al insertar')
            if (productoResponse.status === 200){
                const productoResponseData = await productoResponse.data;
                if(productoResponseData.status==="ok"){
                    setOpenAlertError(false)
                    props.setMsjAlertExitoso("Insertado correctamente")
                    props.setSeverityAlert('success')
                    props.setOpenAlertOk(true);
                    props.reloadAllProducts()
                    handleClose()
                }else{
                    setOpenAlertError(true);
                }
            }else{
                setOpenAlertError(true);
            }
        }else{
            const productoResponse =  await productoService.updateProductBack(dataFormProduct,props.idProducto);
            setMsjError('Error al actualizar')
            if (productoResponse.status === 200){
                const productoResponseData = await productoResponse.data;
                if(productoResponseData.status==="actualizado"){
                    setOpenAlertError(false)
                    props.setMsjAlertExitoso("Actualizado correctamente")
                    props.setSeverityAlert('success')
                    props.setOpenAlertOk(true);
                    props.reloadAllProducts()
                    handleClose()
                }else{
                    setOpenAlertError(true);
                }
            }else{
                setOpenAlertError(true);
            }
        }
        
    }
    
    useEffect(() => {
        reloadDataConfig();
    }, [,]);
    
    
    return(
        <Fragment>
            <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Select
                                labelId="tipo-producto-select-label"
                                id="tipo-producto-select"
                                value={tipoProducto}
                                label="Tipo de producto"
                                onChange={handleChangeTipoProducto}
                                fullWidth
                            >
                                {menuItemProducto}
                            </Select>
                                
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="nombre"
                                label="Nombre"
                                type="text"
                                variant="standard"
                                fullWidth
                                value = {nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                margin="dense"
                                id="descripcion"
                                label="Descripcion"
                                type="text"
                                variant="standard"
                                fullWidth
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                margin="dense"
                                id="precioCompra"
                                label="Precio compra"
                                type="number"
                                variant="standard"
                                fullWidth
                                value={precioCompra}
                                onChange={(e) => setPrecioCompra(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                margin="dense"
                                id="precioVentaMenor"
                                label="Precio Venta X menor"
                                type="number"
                                variant="standard"
                                fullWidth
                                value={precioVentaMenor}
                                onChange={(e) => setPrecioVentaMenor(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                margin="dense"
                                id="precioVentaMayor"
                                label="Precio Venta X mayor"
                                type="number"
                                variant="standard"
                                fullWidth
                                value={precioVentaMayor}
                                onChange={(e) => setPrecioVentaMayor(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                margin="dense"
                                id="stock"
                                label="stock"
                                type="number"
                                variant="standard"
                                fullWidth
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Select
                                labelId="unidad-medida-select-label"
                                id="unidad-medida-select"
                                value={unidadMedida}
                                label="Unidad de medida"
                                onChange={handleChangeUnidadMedida}
                                fullWidth
                            >
                                {menuItemUnidadMedida}
                            </Select>
                            
                        </Grid>
                    </Grid>
                </DialogContent>
                
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={createProduct} variant="contained" >Guardar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje={msjError} severity="error"/>
        </Fragment>
    );
}