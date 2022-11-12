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
export default function SocioClaveModal(props) {

    const server = new Server();
    const [tipoSocio, setTipoSocio] = useState('');
    const [menuItemTipoSocio, setMenuItemTipoSocio] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [menuItemTipoDoc, setMenuItemTipoDoc] = useState('');
    const [nroDoc, setNroDoc] = useState('');
    const [nombreRazon, setNombreRazon] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contacto, setContacto] = useState('');
    const [openAlertError, setOpenAlertError] = useState(false);
    const [msjError, setMsjError] = useState('');


    async function reloadDataById(idSocio) {
        const socioResponse =  await server.getSocioClaveById(idSocio);
        if (socioResponse.status === 200){
            const socioResponseData = await socioResponse.data;
            setTipoSocio(socioResponseData.tipo_socio)
            setTipoDoc(socioResponseData.tipo_doc)
            setNroDoc(socioResponseData.nro_doc) 
            setNombreRazon(socioResponseData.nombre_razon)
            setApellidos(socioResponseData.apellidos)
            setDireccion(socioResponseData.direccion)
            setContacto(socioResponseData.contacto)
        }
    }

    async function reloadDataConfig() {
        const tipoSocioResponse =  await server.getAllTipoSocio();
        const tipoSocioResponseData = await tipoSocioResponse.data;
        setMenuItemTipoSocio(
            tipoSocioResponseData.map((um) => {
                return(
                    <MenuItem value={um.id}>{um.descripcion}</MenuItem>
                )
            })
        )

        const tipoDocResponse =  await server.getAllTipoDocumento();
        const tipoDocResponseData = await tipoDocResponse.data;
        setMenuItemTipoDoc(
            tipoDocResponseData.map((um) => {
                return(
                    <MenuItem value={um.id}>{um.descripcion}</MenuItem>
                )
            })
        )

        if(props.isCreate===false){
            await reloadDataById(props.idSocio)
        }

    }

    
    const handleClose = () => {
        props.setOpenCreate(false);
    };
    
    async function createSocio() {
        var dataFormSocio = {
            tipo_socio: tipoSocio,
            tipo_doc: tipoDoc,
            nro_doc: nroDoc,
            nombre_razon: nombreRazon,
            apellidos: apellidos,
            direccion: direccion,
            contacto: contacto
        }
        
        if(props.isCreate){
            const socioCreateResponse =  await server.createSocio(dataFormSocio);
            setMsjError('Error al insertar')
            if (socioCreateResponse.status === 200){
                const socioCreateResponseData = await socioCreateResponse.data;
                if(socioCreateResponseData.status==="ok"){
                    setOpenAlertError(false)
                    props.setMsjAlertExitoso("Insertado correctamente")
                    props.setSeverityAlert('success')
                    props.setOpenAlertOk(true);
                    props.reloadAllSocioClave(0) 
                    handleClose()
                }else{
                    setOpenAlertError(true);
                }
            }else{
                setOpenAlertError(true);
            }
        }else{
            const socioCreateResponse =  await server.updateSocio(dataFormSocio,props.idSocio);
            setMsjError('Error al actualizar')
            if (socioCreateResponse.status === 200){
                const socioCreateResponseData = await socioCreateResponse.data;
                if(socioCreateResponseData.status==="actualizado"){
                    setOpenAlertError(false)
                    props.setMsjAlertExitoso("Actualizado correctamente")
                    props.setSeverityAlert('success')
                    props.setOpenAlertOk(true);
                    props.reloadAllSocioClave(0) 
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
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Socio</InputLabel>
                            <Select
                                labelId="tipo-socio-select-label"
                                id="tipo-socio-select"
                                value={tipoSocio}
                                label="Tipo de Socio"
                                onChange={(e) => setTipoSocio(e.target.value)}
                                fullWidth
                            >
                                {menuItemTipoSocio}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Documento</InputLabel>
                            <Select
                                labelId="tipo-doc-select-label"
                                id="tipo-doc-select"
                                value={tipoDoc}
                                label="Tipo de Documento"
                                onChange={(e) => setTipoDoc(e.target.value)}
                                fullWidth
                            >
                                {menuItemTipoDoc}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            margin="dense"
                            id="nro_doc"
                            label="Número de Documento"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={nroDoc}
                            onChange={(e) => setNroDoc(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            margin="dense"
                            id="nombres_razon"
                            label="Nombres o Razón Social"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={nombreRazon}
                            onChange={(e) => setNombreRazon(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            margin="dense"
                            id="apellidos"
                            label="Apellidos"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                        <TextField
                            margin="dense"
                            id="direccion"
                            label="Dirección"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            margin="dense"
                            id="contacto"
                            label="Contacto"
                            type="text"
                            variant="standard"
                            fullWidth
                            value={contacto}
                            onChange={(e) => setContacto(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
                
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Cancelar</Button>
                <Button onClick={createSocio} variant="contained" >Guardar</Button>
            </DialogActions>
            <Alert openAlert={openAlertError} setOpenAlert={setOpenAlertError} mensaje={msjError} severity="error"/>
        </Fragment>
    );
}