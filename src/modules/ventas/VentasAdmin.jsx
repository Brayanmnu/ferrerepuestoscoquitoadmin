import React, { useState, useEffect } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from "@mui/material/Pagination";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import VentasModalAnular from "./VentasModalAnular"
import VentasModalUpdate from "./VentasModalUpdate"
import VentaModalDetalle from "./VentaModalDetalle"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { formatDate } from '../../utils/utils'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import LinearProgress from '@mui/material/LinearProgress';
import UpdateIcon from '@mui/icons-material/Update';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

//Servicios
import { Server } from "../../services/server";

//componentes
import Alert from '../../components/Alert'

export default function VentasAdmin(props) {

    const server = new Server();
    const [isCreate, setIsCreate] = useState(true);
    const [componentTableResponsive, setComponentTableResponsive] = useState("");
    const [cantPaginas, setCantPaginas] = useState(0)
    const [page, setPage] = useState(1);
    const [tableBody, setTableBody] = useState("");
    const [openAnular, setOpenAnular] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');
    const [ventaSelected, setVentaSelected] = useState('');
    const [sunatSelected, setSunatSelected] = useState('');
    const [pagadoSelected, setPagadoSelected] = useState('');
    const [cliente, setCliente] = useState('');
    const [tipoComprobante, setTipoComprobante] = useState('4');
    const [sunat, setSunat] = useState('3');
    const [pagado, setPagado] = useState('3');
    const [fechaEmision, setFechaEmision] = useState("");
    const [filtroApply, setFiltroApply] = useState(false);

    const acciones = window.localStorage.getItem('loggedCoquitoAcciones') != null ? window.localStorage.getItem('loggedCoquitoAcciones') : '';

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2FC6B1',
            },
            warning: {
                main: '#fbc02d'
            },
            principal: {
                main: '#0d47a1',
                contrastText: '#fff',
            },
            refresh: {
                main: '#673ab7',
            }
        },
    });

    const columns = [
        { id: 'fecha_emision', align: 'center', label: 'Fecha Emisión', minWidth: 170, format: 'string' },
        { id: 'comprobante', align: 'center', label: 'Comprobante', minWidth: 170, format: 'string' },
        { id: 'sunat', align: 'center', label: 'SUNAT', minWidth: 170, format: 'string' },
        { id: 'cliente', align: 'center', label: 'Cliente', minWidth: 170, format: 'string' },
        { id: 'telefono', align: 'center', label: 'Telefono', minWidth: 170, format: 'string' },
        { id: 'is_pagado', align: 'center', label: 'Pagado', minWidth: 80, maxWidth: 90, format: 'string' },
        { id: 'total', align: 'center', label: 'Total', minWidth: 170, format: 'string' },
        { id: 'acciones', align: 'center', label: 'Acciones', minWidth: 170, format: 'string' }

    ];

    async function reloadAllVentas(nroPag, fechaEmisionIn, clienteIn, tipoComprobanteIn, sunatIn, pagadoIn) {
        setCantPaginas(0)
        setTableBody("")
        const ventasAll = await server.getAllVentas(nroPag, fechaEmisionIn, clienteIn, tipoComprobanteIn, sunatIn, pagadoIn);
        if (ventasAll.status === 200) {
            var ventasData = await ventasAll.data;
            var cantPaginas = 0;

            setTableBody(
                <TableBody>
                    {ventasData.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10);
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                <TableCell align='center' key="fecha_emision">
                                    {row.fecha_emision}
                                </TableCell>
                                <TableCell align='center' key="tipo_comprobante">
                                    {row.tipo_comprobante} - {row.numeracion}
                                </TableCell>
                                <TableCell align='center' key="sunat">
                                    {row.tipo_comprobante != "Recibo" ? row.sunat ? "GENERADO" : "SIN GENERAR" : "--"}
                                </TableCell>
                                <TableCell align='center' key="cliente">
                                    {row.nombres_razon ? row.nombres_razon : "SIN DATOS"}
                                </TableCell>
                                <TableCell align='center' key="telefono">
                                    {row.telefono}
                                </TableCell>
                                <TableCell align='center' key="is_pagado">
                                    {row.is_pagado ? "PAGADO" : "PENDIENTE"}
                                </TableCell>
                                <TableCell align='center' key="total">
                                    S/.{row.total}
                                </TableCell>
                                <TableCell align='center' key="options">
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
                                        <ThemeProvider theme={theme}>
                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                <Grid item xs={3} sm={3} md={3}>
                                                    <IconButton aria-label="edit" color="info" >
                                                        <ArticleIcon fontSize="medium" onClick={() => handleClickOpenDetail(row)} />
                                                    </IconButton>
                                                </Grid>
                                                {
                                                    acciones.includes('6') ?
                                                        <Grid item xs={3} sm={3} md={3}>
                                                            <IconButton aria-label="edit" color="refresh" onClick={() => handleClickOpenUpdate(row)} >
                                                                <UpdateIcon fontSize="medium" />
                                                            </IconButton>
                                                        </Grid> : null
                                                }
                                                {
                                                    acciones.includes('6') ?
                                                        <Grid item xs={3} sm={3} md={3}>
                                                            <IconButton aria-label="edit" color="primary" >
                                                                <AccountBalanceIcon fontSize="medium" />
                                                            </IconButton>
                                                        </Grid> : null
                                                }
                                                {
                                                    acciones.includes('6') ?
                                                        <Grid item xs={3} sm={3} md={3}>
                                                            <IconButton aria-label="edit" color="error" >
                                                                <PlaylistRemoveIcon fontSize="medium" />
                                                            </IconButton>
                                                        </Grid> : null
                                                }
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
                        cantPaginas = Math.ceil(row.total_elements / 10);
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>
                                    <div>Fecha Emisión: {row.fecha_emision}</div>
                                    <div>Comprobante: {row.tipo_comprobante} - {row.numeracion}</div>
                                    <div>SUNAT: {row.sunat ? "GENERADO" : "SIN GENERAR"} </div>
                                    <div>Cliente:  {row.nombres_razon ? row.nombres_razon : "SIN DATOS"}</div>
                                    <div>Pagado: {row.is_pagado ? "PAGADO" : "PENDIENTE"}</div>
                                    <div>Total: S/. {row.total}</div>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <ThemeProvider theme={theme}>
                                            <Grid item xs={3} sm={3} md={3}>
                                                <div style={{ justifyContent: "center", display: "flex" }}>
                                                    <IconButton aria-label="edit" color="info" >
                                                        <ArticleIcon fontSize="medium" />
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3}>
                                                <div style={{ justifyContent: "center", display: "flex" }}>
                                                    <IconButton aria-label="edit" color="refresh" value={row} onClick={() => handleClickOpenUpdate(row)} >
                                                        <UpdateIcon fontSize="medium" />
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3}>
                                                <div style={{ justifyContent: "center", display: "flex" }}>
                                                    <IconButton aria-label="edit" color="primary" >
                                                        <AccountBalanceIcon fontSize="medium" />
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={3} sm={3} md={3}>
                                                <div style={{ justifyContent: "center", display: "flex" }}>
                                                    <IconButton aria-label="edit" color="error" >
                                                        <PlaylistRemoveIcon fontSize="medium" />
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

    const handleClickOpenUpdate = (venta) => {
        setVentaSelected(venta);
        setOpenUpdate(true)
    };

    const handleClickOpenDetail = (venta) => {
        setVentaSelected(venta);
        setOpenDetail(true)
    };

    const handleClickOpenAnular = (event) => {
        setOpenAnular(true);
        setVentaSelected(event.currentTarget.value);
    };


    const handleChangePagina = (event, value) => {
        reloadAllVentas((value - 1) * 10, fechaEmision, cliente, tipoComprobante, sunat, pagado);
        setPage(value);
    };


    async function aplicarFiltro() {
        setFiltroApply(!filtroApply);
        setPage(1);
    }

    async function clearFiltro() {
        setFechaEmision("")
        setCliente("")
        setTipoComprobante('4')
        setSunat('3')
        setPagado('3')
        setFiltroApply(!filtroApply)
        setPage(1);
    }

    useEffect(() => {
        if (props.mobileOpen == true) {
            props.onDrawerToggle()
        }
        reloadAllVentas(0, fechaEmision, cliente, tipoComprobante, sunat, pagado)
    }, [filtroApply]);

    const handleChangeCliente = (event) => {
        const inputValue = event.target.value;
        // Expresión regular para validar solo letras y números
        const regex = /^[a-zA-Z0-9\s]*$/;

        // Verifica si el valor ingresado cumple con la expresión regular
        if (regex.test(inputValue)) {
            setCliente(inputValue.toUpperCase());
        }
    };

    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }} style={{ padding: "6px" }}>
                        <Grid item xs={12} sm={12} md={12}>
                            Filtros
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <TextField
                                fullWidth
                                id="fechaEmision"
                                label="Fecha de emisión"
                                type="date"
                                defaultValue={fechaEmision}
                                value={fechaEmision}
                                onChange={(e) => setFechaEmision(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="cliente"
                                label="Cliente"
                                type="text"
                                variant="standard"
                                fullWidth
                                value={cliente}
                                onChange={handleChangeCliente}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de comprobante</InputLabel>
                                <Select
                                    labelId="tipo-comprobante-select-label"
                                    id="tipo-comprobante-select"
                                    value={tipoComprobante}
                                    label="tipoComprobante"
                                    onChange={(e) => setTipoComprobante(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="4">TODOS</MenuItem>
                                    <MenuItem value="1">Recibo</MenuItem>
                                    <MenuItem value="2">Factura</MenuItem>
                                    <MenuItem value="3">Boleta</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>SUNAT</InputLabel>
                                <Select
                                    labelId="sunat-select-label"
                                    id="sunat-select"
                                    label="sunat"
                                    value={sunat}
                                    onChange={(e) => setSunat(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="3">TODOS</MenuItem>
                                    <MenuItem value="1">Sin Generar</MenuItem>
                                    <MenuItem value="2">Generado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Pagado</InputLabel>
                                <Select
                                    labelId="pagado-select-label"
                                    id="pagado-select"
                                    label="pagado"
                                    value={pagado}
                                    onChange={(e) => setPagado(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="3">TODOS</MenuItem>
                                    <MenuItem value="1">Pendiente</MenuItem>
                                    <MenuItem value="2">Pagado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={1} md={1} >
                            <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                <Grid item>
                                    <IconButton aria-label="aplicar" color="primary" onClick={aplicarFiltro} ><ManageSearchIcon /></IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton aria-label="aplicar" color="primary" onClick={clearFiltro} ><ClearIcon /></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
                    {(props.isSmUp) ? (
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TableContainer sx={{ maxHeight: 450 }}>
                                    {tableBody == "" ? <LinearProgress color="info" /> : null}
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
                    {/* <Dialog open={openAnular} onClose={() => setOpenAnular(false)}>
                        <VentasModalAnular
                            setOpenAnular={setOpenAnular}
                            idComprobante={ventaSelected}
                            setOpenAlertOk={setOpenAlertOk}
                            setMsjAlertExitoso={setMsjAlertExitoso}
                            setSeverityAlert={setSeverityAlert}
                            reloadAllVentas={reloadAllVentas} />
                    </Dialog> */}
                    <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
                        <VentasModalUpdate
                            setOpenUpdate={setOpenUpdate}
                            ventaSelected={ventaSelected}
                            setOpenAlertOk={setOpenAlertOk}
                            setMsjAlertExitoso={setMsjAlertExitoso}
                            setSeverityAlert={setSeverityAlert}
                            setFiltroApply={setFiltroApply}
                            filtroApply={filtroApply} />
                    </Dialog>
                    <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
                        <VentaModalDetalle
                            ventaSelected={ventaSelected} />
                    </Dialog>


                    <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert} />
                </Paper>
            </Grid>
        </Grid>
    );
}