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
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
//Servicios
import { Server } from "../../services/server";

//componente
import Alert from '../../components/Alert'
export default function ProductAdminModal(props) {

    const server = new Server();

    const [tipoProducto, setTipoProducto] = useState('');
    const [subTipoProducto, setSubTipoProducto] = useState('');
    const [deId, setDeId] = useState('');
    const [aId, setAId] = useState('');
    const [deValue, setDeValue] = useState('');
    const [aValue, setAValue] = useState('');
    const [descSubTipoProducto, setDescSubTipoProducto] = useState('');
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
    const [isDisbledSubTipo, setIsDisbledSubTipo] = useState(false);
    const [isDisabledDe, setIsDisabledDe] = useState(false);
    const [isDisabledA, setIsDisabledA] = useState(false);

    
    var arrayTipoProducto = []
    var arrayUnidadMedida = []

    const handleClose = () => {
        props.setOpenCreate(false);
    };
    
    const handleChangeSubTipoProducto = (event) => {
        setSubTipoProducto(event.target.value);
    };

    const handleChangeDeId = (event) => {
        setDeId(event.target.value);
    };

    
    const handleChangeAId = (event) => {
        setAId(event.target.value);
    };

    const handleChangeDescSubTipoProducto = (event) => {
        var valorDesc = event.target.value
        const reg = /\d/;
        if(!reg.test(valorDesc)){
            setDescSubTipoProducto(valorDesc.toUpperCase());
        }
        
    };

    const handleChangeUnidadMedida = (event) => {
        setUnidadMedida(event.target.value);
    };

    async function reloadDataById(idProduct) {
        const productoResponse =  await server.getProductoById(idProduct);
        if (productoResponse.status === 200){
            const productoResponseData = await productoResponse.data;
            setSubTipoProducto(productoResponseData.id_tipo_producto);
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
        const tipoProductoResponse =  await server.getAllTipoProducto();
        arrayTipoProducto = await tipoProductoResponse.data;
        setMenuItemProducto(
            arrayTipoProducto.map((tp) => {
                return(
                    <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                )
                
            })
        )
        const undidadMedidaResponse =  await server.getAllUnidadMedida();
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
    
    const onClickAddSubProduct = (event) => {
        setIsDisbledSubTipo(true)
        //console.log('se agrega: '+event.currentTarget.value)
    };

    
    const onClickAddDe = (event) => {
        setIsDisabledDe(true)
        //console.log('se agrega: '+event.currentTarget.value)
    };

    
    const onClickAddA = (event) => {
        setIsDisabledA(true)
        //console.log('se agrega: '+event.currentTarget.value)
    };
    
    const onClickQuitSubProduct = (event) => {
        setIsDisbledSubTipo(false)
    };

    const onClickQuitDe = (event) => {
        setIsDisabledDe(false)
    };
    
    const onClickQuitA = (event) => {
        setIsDisabledA(false)
    };

    async function createProduct() {
        

        var dataFormProduct = {
            id_tipo_producto: subTipoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio_compra: precioCompra,
            precio_venta_menor: precioVentaMenor,
            precio_venta_mayor: precioVentaMayor,
            stock: stock,
            id_unidad_medida:unidadMedida
        }

        if(props.isCreate){
            const productoResponse =  await server.createProductBack(dataFormProduct);
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
            const productoResponse =  await server.updateProductBack(dataFormProduct,props.idProducto);
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
            <DialogContent style={{paddingTop:'1vh'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {!isDisbledSubTipo?
                    <Grid item xs={10} sm={10} md={10}>
                        <FormControl fullWidth>
                            <InputLabel>Subtipo</InputLabel>
                            <Select
                                labelId="sub-tipo-producto-select-label"
                                id="sub-tipo-producto-select"
                                value={subTipoProducto}
                                label="Subtipo"
                                onChange={handleChangeSubTipoProducto}
                                fullWidth
                            >
                                {menuItemProducto}
                            </Select>
                        </FormControl>
                    </Grid>:null}
                    { !isDisbledSubTipo?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="agregar" color="primary" onClick={onClickAddSubProduct} ><AddCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null}
                    {
                        isDisbledSubTipo?
                        <Grid item xs={10} sm={10} md={10}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new-sub-type"
                                label="Nuevo Subtipo"
                                type="text"
                                variant="standard"
                                fullWidth
                                value = {descSubTipoProducto}
                                onChange={handleChangeDescSubTipoProducto}
                            />
                        </Grid>: null
                    }
                    {
                        isDisbledSubTipo?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="quitar" color="primary" onClick={onClickQuitSubProduct}><RemoveCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null
                    }

                    {!isDisabledDe?
                        <Grid item xs={10} sm={10} md={10}>
                            <FormControl fullWidth>
                                <InputLabel>De</InputLabel>
                                <Select
                                    labelId="de-select-label"
                                    id="de-select"
                                    value={deId}
                                    label="De"
                                    onChange={handleChangeAId}
                                    fullWidth
                                >
                                    {menuItemProducto}
                                </Select>
                            </FormControl>
                        </Grid>:null}
                    
                    { !isDisabledDe?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="agregar" color="primary" onClick={onClickAddDe} ><AddCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null}

                    {
                        isDisabledDe?
                        <Grid item xs={10} sm={10} md={10}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new-de"
                                label="Nueva medida De"
                                type="text"
                                variant="standard"
                                fullWidth
                                value = {deValue}
                                onChange={(e) => setDeValue(e.target.value.toUpperCase)}
                            />
                        </Grid>: null
                    }

                    {isDisabledDe?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="quitar" color="primary" onClick={onClickQuitDe}><RemoveCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null
                    }

                    {!isDisabledA?
                        <Grid item xs={10} sm={10} md={10}>
                            <FormControl fullWidth>
                                <InputLabel>A</InputLabel>
                                <Select
                                    labelId="a-select-label"
                                    id="a-select"
                                    value={aId}
                                    label="A"
                                    onChange={handleChangeDeId}
                                    fullWidth
                                >
                                    {menuItemProducto}
                                </Select>
                            </FormControl>
                        </Grid>:null}
                    
                    { !isDisabledA?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="agregar" color="primary" onClick={onClickAddA} ><AddCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null}

                    {
                        isDisabledA?
                        <Grid item xs={10} sm={10} md={10}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="new-a"
                                label="Nueva medida A"
                                type="text"
                                variant="standard"
                                fullWidth
                                value = {aValue}
                                onChange={(e) => setAValue(e.target.value.toUpperCase)}
                            />
                        </Grid>: null
                    }

                    {isDisabledA?
                    <Grid item xs={2} sm={2} md={2}>
                        <IconButton aria-label="quitar" color="primary" onClick={onClickQuitA}><RemoveCircleIcon fontSize="large"/></IconButton>
                    </Grid>:null
                    }
                    
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