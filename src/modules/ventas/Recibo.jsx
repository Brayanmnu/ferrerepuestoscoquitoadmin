import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import  {formatDate} from '../../utils/utils'

export default function Recibo(props) {
    const [tipoComprobante, setTipoComprobante] = useState('1');
    const [fechaEmision, setFechaEmision] = useState('');
    const [labelNroDoc, setLabelNroDoc] = useState('DNI');
    const [labelNombresRazon, setLabelNombresRazon] = useState('Nombres');
    const [nroDoc, setNroDoc] = useState('');
    const [nombresRazon, setNombresRazon] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [formaPago, setFormaPago] = useState('1');

    async function searchByNroDoc() {
        console.log('se buscará por numero de documento')
    }

    async function searchByNombreRazon() {
        console.log('se buscará por nombre o razon social')
    }

    async function searchByApellidos() {
        console.log('se buscará por apellidos')
    }

    
    const handleChangeTipoRecibo = (event) => {
        setTipoComprobante(event.target.value);
        if(event.target.value==='1' || event.target.value==='3'){
            setLabelNroDoc('DNI')
            setLabelNombresRazon('Nombres')
        }
        if(event.target.value==='2'){
            setLabelNroDoc('RUC')
            setLabelNombresRazon('Razón Social')
        }
    };


    return(
        <Grid container rowSpacing={2}>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{maxWidth: 1020, margin: 'auto', overflow: 'hidden' }}>
                    <Grid container style={{padding:"10px"}}  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item xs={12} sm={4} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de comprobante</InputLabel>
                                <Select
                                    labelId="tipo-comprobante-select-label"
                                    id="tipo-comprobante-select"
                                    value={tipoComprobante}
                                    label="tipoComprobante"
                                    onChange={handleChangeTipoRecibo}
                                    fullWidth
                                >
                                    <MenuItem value="1">Recibo</MenuItem>
                                    <MenuItem value="2">Factura</MenuItem>
                                    <MenuItem value="3">Boleta</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Forma de pago</InputLabel>
                                <Select
                                    labelId="forma-pago-select-label"
                                    id="forma-pago-select"
                                    value={formaPago}
                                    label="formaPago"
                                    onChange={(e) => setFormaPago(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="1">Efectivo</MenuItem>
                                    <MenuItem value="2">Transferencia CC Interbank</MenuItem>
                                    <MenuItem value="3">Yape</MenuItem>
                                    <MenuItem value="4">Transferencia BCP</MenuItem>
                                    <MenuItem value="5">Transferencia BBVA</MenuItem>
                                    <MenuItem value="6">Transferencia Interbank</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <TextField
                                fullWidth   
                                id="fechaEmision"
                                label="Fecha de emisión"
                                type="date"
                                defaultValue={formatDate()}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} sm={4} md={4}>
                            <TextField
                                margin="dense"
                                id="nroDoc"
                                label={labelNroDoc}
                                type="number"
                                variant="standard"
                                fullWidth
                                value={nroDoc}
                                onChange={(e) => setNroDoc(e.target.value)}
                            />
                        </Grid>
                        <div style={{justifyContent:"left",display:"flex", paddingTop:"3vh"}}>
                            <Grid item xs={1} sm={1} md={1} >
                                <IconButton aria-label="buscar" color="info" onClick={searchByNroDoc}>
                                    <SearchIcon fontSize="medium"/>
                                </IconButton>
                            </Grid>
                        </div>
                        <Grid item xs={10} sm={7} md={7}>
                            <TextField
                                margin="dense"
                                id="nombresRazon"
                                label={labelNombresRazon}
                                variant="standard"
                                fullWidth
                                value={nombresRazon}
                                onChange={(e) => setNombresRazon(e.target.value)}
                            />
                        </Grid>
                        <div style={{justifyContent:"left",display:"flex", paddingTop:"3vh"}}>
                            <Grid item xs={1} sm={1} md={1} >
                                <IconButton aria-label="buscar" color="info" onClick={searchByNombreRazon}>
                                    <SearchIcon fontSize="medium"/>
                                </IconButton>
                            </Grid>
                        </div>
                        <Grid item xs={12} sm={4} md={4}>
                            <TextField
                                margin="dense"
                                id="telefono"
                                label="Teléfono"
                                variant="standard"
                                fullWidth
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <TextField
                                margin="dense"
                                id="direccion"
                                label="Dirección"
                                variant="standard"
                                fullWidth
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </Grid>
                        
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{maxWidth: 1020, margin: 'auto', overflow: 'hidden' }}>
                    <Grid container style={{padding:"10px"}}  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
