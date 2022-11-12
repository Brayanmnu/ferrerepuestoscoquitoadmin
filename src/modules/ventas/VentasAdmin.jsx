import React, { useState, useEffect } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Pagination from "@mui/material/Pagination";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VentasModalAnular from "./VentasModalAnular"
import Recibo from "./Recibo"
import VisibilityIcon from '@mui/icons-material/Visibility';
//Servicios
import { Server } from "../../services/server";

//componentes
import Alert from '../../components/Alert'

export default function VentasAdmin(props) {

    const server = new Server();
    const [openCreate, setOpenCreate] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [componentTableResponsive, setComponentTableResponsive] = useState("");
    const [cantPaginas,setCantPaginas] = useState(0)
    const [page, setPage] = useState(1);
    const [tableBody, setTableBody] = useState();
    const [openAnular, setOpenAnular] = useState(false);
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');
    const [idComprobante, setIdComprobante] = useState('');


    const theme = createTheme({
        palette: {
          primary: {
            main: '#2FC6B1',
          },
          warning :{
            main: '#fbc02d'
          },
          addReg: {
            main :'#0d47a1',
            contrastText: '#fff',
          }
        },
    });

    const columns= [
        { id: 'tipo_comprobante',align: 'center', label: 'Tipo Comprobante', minWidth: 170, format: 'string' },
        { id: 'numeracion',align: 'center', label: 'Numeración', minWidth: 170, format: 'string' },
        { id: 'fecha_creacion',align: 'center', label: 'Fecha Creación', minWidth: 170, format: 'string' },
        { id: 'fecha_actualizacion',align: 'center', label: 'Fecha Actualización', minWidth: 170, format: 'string' },
        { id: 'cliente',align: 'center', label: 'Cliente', minWidth: 170, format: 'string' },
        { id: 'is_pagado',align: 'center', label: 'Pagado Total', minWidth: 170 , format: 'string'},
        { id: 'total',align: 'center', label: 'Total', minWidth: 170, format: 'string'},
        { id: 'acciones',align: 'center', label: 'Acciones', minWidth: 170, format: 'string'}

    ];
    
    async function reloadAllVentas(nroPag) {
        
        const ventasAll =  await server.getAllVentas(nroPag);
        if (ventasAll.status === 200){
            var ventasData = await ventasAll.data;
            var cantPaginas=0;

            setTableBody(
                <TableBody>
                    {ventasData.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10 );
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                <TableCell key="tipo_comprobante">
                                    {row.tipo_comprobante}
                                </TableCell>
                                <TableCell key="numeracion">
                                    {row.numeracion} 
                                </TableCell>
                                <TableCell key="fecha_creacion">
                                    {row.fecha_creacion}
                                </TableCell>
                                <TableCell key="fecha_actualizacion">
                                    {row.fecha_actualizacion}
                                </TableCell>
                                <TableCell key="cliente">
                                    {row.cliente}
                                </TableCell>
                                <TableCell key="is_pagado">
                                    {row.is_pagado}
                                </TableCell>
                                <TableCell key="total">
                                    {row.total}
                                </TableCell>
                                <TableCell key="options">
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
                                        <ThemeProvider theme={theme}>
                                            <div style={{justifyContent:"center",display:"flex"}}>
                                                <Grid item xs={4} sm={2} md={4}>
                                                    <IconButton aria-label="detail" color="warning" value={row.id_comprobante} onClick={handleClickOpenDetail}>
                                                        <VisibilityIcon fontSize="medium"/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={4} sm={2} md={4}>
                                                    <IconButton aria-label="anular" color="error" value={row.id_comprobante} onClick={handleClickOpenAnular}>
                                                        <DeleteIcon fontSize="medium"/>
                                                    </IconButton>
                                                </Grid>
                                            </div>
                                        </ThemeProvider>                    
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            );

            
            setComponentTableResponsive(
                <Table>
                    {ventasData.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10 );
                        setCantPaginas(cantPaginas)
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>
                                    <div>Numeración: {row.numeracion}</div>
                                    <div>Fecha Creación: {row.fecha_creacion}</div>
                                    <div>Fecha Actualización: {row.fecha_actualizacion}</div>
                                    <div>Tipo Comprobante: {row.tipo_comprobante}</div>
                                    <div>Cliente: {row.cliente}</div>
                                    <div>Pagado Total: {row.is_pagado}</div>
                                    <div>Total: {row.total}</div>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <ThemeProvider theme={theme}>
                                            <Grid item xs={4} sm={4} md={4}>
                                                <div style={{justifyContent:"center",display:"flex"}}>
                                                    <IconButton aria-label="edit" color="warning" value={row.id_comprobante} onClick={handleClickOpenDetail}>
                                                        <VisibilityIcon fontSize="medium"/>
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4}>
                                                <div style={{justifyContent:"center",display:"flex"}}>
                                                    <IconButton aria-label="anular" color="error" value={row.id_comprobante} onClick={handleClickOpenAnular}>
                                                        <DeleteIcon fontSize="medium"/>
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                        </ThemeProvider>
                                    </Grid>                                    
                                </TableCell>
                                
                            </TableRow>
                        )
                    })}
                </Table>
            )
        }
    }

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
        setIsCreate(true);
    };

    const handleClickOpenDetail = (event) => {
        setOpenCreate(true);
        setIsCreate(false);
        setIdComprobante(event.currentTarget.value);
    };

    const handleClickOpenAnular = (event) => {
        setOpenAnular(true);
        setIdComprobante(event.currentTarget.value);
    };
    
    
    const handleChangePagina = (event, value) => {
        reloadAllVentas((value-1)*10) 
        setPage(value);
    };

    useEffect(() => {
        reloadAllVentas(0) 
    }, [,]);

    return(openCreate? <Recibo/>:
        <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={3} md={3}>
                <ThemeProvider theme={theme}>
                <div style={{justifyContent:(props.isSmUp) ? "left":"center",display:"flex"}}>
                    <Button variant="contained" sx={{ mr: 1 }} color="addReg" onClick={handleClickOpenCreate}>
                        Registrar
                    </Button>
                </div>
                    
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{maxWidth: 970, margin: 'auto', overflow: 'hidden' }}>
                    {(props.isSmUp) ? (
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TableContainer sx={{ maxHeight: 450 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        {tableBody}
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    ) : (
                        <TableContainer>
                            {componentTableResponsive}
                        </TableContainer>
                    )
                    }
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Pagination
                                count={cantPaginas}
                                page={page}
                                variant="outlined"
                                color="primary"
                                onChange={handleChangePagina}
                            />
                        </Grid>
                    </Grid>
                    <Dialog open={openAnular} onClose={() => setOpenAnular(false)}>
                        <VentasModalAnular 
                            setOpenAnular={setOpenAnular} 
                            idComprobante={idComprobante} 
                            setOpenAlertOk={setOpenAlertOk} 
                            setMsjAlertExitoso={setMsjAlertExitoso} 
                            setSeverityAlert={setSeverityAlert}
                            reloadAllVentas={reloadAllVentas}/>
                    </Dialog>
                    <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert}/>
                </Paper>
            </Grid>
        </Grid>
    );
}