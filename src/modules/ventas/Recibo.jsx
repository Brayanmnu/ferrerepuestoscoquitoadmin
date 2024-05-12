import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell'
import Dialog from '@mui/material/Dialog'
import EditIcon from '@mui/icons-material/Edit';
import ReciboModal from "./ReciboModal";
import Alert from '../../components/Alert'
import { Server } from "../../services/server";
import ReciboModalFinal from "./ReciboModalFinal";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Recibo() {

    const server = new Server();
    const [tipoComprobante, setTipoComprobante] = useState('1');
    const [labelNroDoc, setLabelNroDoc] = useState('DNI');
    const [labelNombresRazon, setLabelNombresRazon] = useState('Nombres');
    const [nroDoc, setNroDoc] = useState('');
    const [nombresRazon, setNombresRazon] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [tipoPago, setTipoPago] = useState('1');
    const [medioPago, setMedioPago] = useState('1');
    const [tableBody, setTableBody] = useState();
    const [sumaTotal, setSumaTotal] = useState(0);
    const [sumaSubTotal, setSumaSubTotal] = useState(0);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');
    const [productoSelect, setProductoSelect] = useState("");
    const [productos, setProductos] = useState([]);
    const [observaciones, setObservaciones] = useState('');
    const [aCuenta, setACuenta] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [openModalPdf, setOpenModalPdf] = useState(false);
    const [igv, setIgv] = useState(0);




    const columns = [
        { id: 'eliminar', align: 'center', label: 'Eliminar', minWidth: 50, format: 'string' },
        { id: 'cantidad', align: 'center', label: 'Cantidad', minWidth: 70, format: 'string' },
        { id: 'descripcion', align: 'center', label: 'Descripción', minWidth: 170, format: 'string' },
        { id: 'precio_unitario', align: 'center', label: 'P. Unitario', minWidth: 100, format: 'string' },
        { id: 'precio_total', align: 'center', label: 'P. Total', minWidth: 100, format: 'string' },
        { id: 'editar', align: 'center', label: 'Editar', minWidth: 50, format: 'string' },
    ];
    async function searchByNroDoc() {
        var tipoDoc = ''
        if (tipoComprobante == '2') {
            tipoDoc = 'ruc'
        } else {
            tipoDoc = 'dni'
        }
        const response = await server.getNombresRazonByNroDoc(tipoDoc, nroDoc);
        setNombresRazon(response.data.nombres_razon)
    }

    useEffect(() => {
        const datosCliente = window.localStorage.getItem('recibo') != null ? JSON.parse(window.localStorage.getItem('recibo')) : null;
        if (datosCliente != null) {
            setTipoComprobante(datosCliente.id_tipo_comprobante)
            setMedioPago(datosCliente.id_medio_pago)
            setTipoPago(datosCliente.id_tipo_pago)
            setNroDoc(datosCliente.nro_doc)
            setNombresRazon(datosCliente.nombres_razon)
            setTelefono(datosCliente.telefono)
            setDireccion(datosCliente.direccion)
            changeLabels(datosCliente.id_tipo_comprobante)

            setObservaciones(datosCliente.observaciones)
            setACuenta(datosCliente.a_cuenta)
            setSaldo(datosCliente.saldo)
        }

        reloadAllProducts()

    }, [,]);

    function changeLabels(id) {
        if (id === '1' || id === '3') {
            setLabelNroDoc('DNI')
            setLabelNombresRazon('Nombres')
        }
        if (id === '2') {
            setLabelNroDoc('RUC')
            setLabelNombresRazon('Razón Social')
        }
    }

    const handleChangeTipoRecibo = (event) => {
        setTipoComprobante(event.target.value);
        changeLabels(event.target.value)
    };


    const handleClickOpenEdit = (event) => {
        setOpenEdit(true);
        setProductoSelect(JSON.parse(event.currentTarget.value));
    };

    const handleClickOpenDelete = (event) => {
        const indice = event.currentTarget.value
        let productosDelete = window.localStorage.getItem('cartMemory') != null ? JSON.parse(window.localStorage.getItem('cartMemory')) : [];
        productosDelete.splice(indice, 1);
        window.localStorage.setItem(
            'cartMemory', JSON.stringify(productosDelete)
        )
        reloadAllProducts();
    };


    const handleClickSaveClient = () => {
        let dataFormRecibo = {
            id_tipo_comprobante: tipoComprobante,
            id_tipo_pago: tipoPago,
            id_medio_pago: medioPago,
            nro_doc: nroDoc,
            nombres_razon: nombresRazon,
            telefono: telefono,
            direccion: direccion,
            observaciones: observaciones,
            a_cuenta: aCuenta,
            saldo: saldo,
        }
        window.localStorage.setItem(
            'recibo', JSON.stringify(dataFormRecibo)
        )
    };


    const handleClickFinish = () => {
        setOpenModalPdf(true);
    };


    async function reloadAllProducts() {
        var sumaTotalLocal = 0;
        var sumaParcial = 0;
        const itemsCart = window.localStorage.getItem('cartMemory') != null ? JSON.parse(window.localStorage.getItem('cartMemory')) : [];
        var cantidadItems = itemsCart.length
        setProductos(itemsCart)

        setTableBody(
            <TableBody>
                {itemsCart.map((item, i) => {
                    sumaParcial = item.precio_unit * item.cantidad;
                    sumaTotalLocal += sumaParcial
                    setSumaTotal(sumaTotalLocal)
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            <TableCell align="center">
                                <IconButton disabled={cantidadItems == 1} aria-label="edit" color="error" value={i} onClick={handleClickOpenDelete} ><HighlightOffIcon fontSize="large" /></IconButton>
                            </TableCell>
                            <TableCell align="center">
                                {item.cantidad}
                            </TableCell>
                            <TableCell>
                                {item.descripcion_producto}
                            </TableCell>
                            <TableCell align="center">
                                S/. {item.precio_unit}
                            </TableCell>
                            <TableCell align="center">
                                S./ {sumaParcial}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="edit" color="info" value={JSON.stringify(item)} onClick={handleClickOpenEdit} ><EditIcon fontSize="medium" /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        )
        let sumaSubTotalLocal = Math.round((sumaTotalLocal / 1.18) * 100) / 100
        setSumaSubTotal(sumaSubTotalLocal)
        setIgv(Math.round((sumaTotalLocal - sumaSubTotalLocal) * 100) / 100)
    }


    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }} style={{ padding: "6px" }}>
                        <Grid item xs={12} sm={3} md={3}>
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
                        <Grid item xs={10} sm={2} md={2}>
                            <TextField
                                autoComplete="false"
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
                        <div style={{ justifyContent: "left", display: "flex", paddingTop: "3vh" }}>
                            <Grid item xs={1} sm={1} md={1} >
                                <IconButton aria-label="buscar" color="info" onClick={searchByNroDoc}>
                                    <SearchIcon fontSize="medium" />
                                </IconButton>
                            </Grid>
                        </div>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="dense"
                                id="nombresRazon"
                                label={labelNombresRazon}
                                variant="standard"
                                fullWidth
                                value={nombresRazon}
                                onChange={(e) => setNombresRazon(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2}>
                            <TextField
                                margin="dense"
                                id="telefono"
                                label="Teléfono"
                                variant="standard"
                                fullWidth
                                value={telefono}
                                type="number"
                                onChange={(e) => setTelefono(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sm={5} md={5}>
                            <TextField
                                margin="dense"
                                id="direccion"
                                label="Dirección"
                                variant="standard"
                                fullWidth
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value.toUpperCase())}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} md={5}>
                            <TextField
                                margin="dense"
                                id="observaciones"
                                label="Observaciones"
                                variant="standard"
                                fullWidth
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value.toUpperCase())}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de pago</InputLabel>
                                <Select
                                    labelId="tipo-pago-select-label"
                                    id="tipo-pago-select"
                                    value={tipoPago}
                                    label="tipoPago"
                                    onChange={(e) => setTipoPago(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="1">Completo</MenuItem>
                                    <MenuItem value="2">Crédito</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Medio de pago</InputLabel>
                                <Select
                                    labelId="forma-pago-select-label"
                                    id="forma-pago-select"
                                    value={medioPago}
                                    label="medioPago"
                                    onChange={(e) => setMedioPago(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="1">Efectivo</MenuItem>
                                    <MenuItem value="2">Yape</MenuItem>
                                    <MenuItem value="3">Transferencia BCP</MenuItem>
                                    <MenuItem value="4">Transferencia BBVA</MenuItem>
                                    <MenuItem value="5">Transferencia Interbank</MenuItem>
                                    <MenuItem value="6">Transferencia Interbank Empresas</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            tipoPago == 2 ?
                                <Grid item xs={10} sm={3} md={3}>
                                    <TextField
                                        autoComplete="false"
                                        margin="dense"
                                        id="aCuenta"
                                        label="A Cuenta"
                                        type="number"
                                        variant="standard"
                                        fullWidth
                                        value={aCuenta}
                                        onChange={(e) => setACuenta(e.target.value)}
                                    />
                                </Grid> : null
                        }
                        {
                            tipoPago == 2 ?
                                <Grid item xs={10} sm={3} md={3}>
                                    <TextField
                                        autoComplete="false"
                                        margin="dense"
                                        id="saldo"
                                        label="Saldo"
                                        type="number"
                                        variant="standard"
                                        fullWidth
                                        value={saldo}
                                        onChange={(e) => setSaldo(e.target.value)}
                                    />
                                </Grid> : null
                        }
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }} style={{ padding: "6px" }}>
                        <TableContainer sx={{ maxHeight: 390 }}>
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
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>SUBTOTAL</TableCell>
                                    <TableCell align="center">S/. {sumaSubTotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>IGV</TableCell>
                                    <TableCell align="center">18 %</TableCell>
                                    <TableCell align="center">S/. {igv}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>TOTAL</TableCell>
                                    <TableCell align="center">S./ {sumaTotal}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
            </Grid>

            <Grid container xs={12} xm={12} md={12} style={{ padding: "10px" }} justifyContent="flex-end" columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item xs={2} sm={2} md={2}>
                    <p style={{ fontWeight: 'bold', color: 'red', fontSize: '20px' }}> TOTAL: S/. {sumaTotal}</p>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Button variant="contained" onClick={handleClickSaveClient}>Guardar</Button>
                </Grid>
                <Grid xs={2} sm={2} md={2}>
                    <Button variant="contained" color="success" onClick={handleClickFinish}> Finalizar </Button>

                </Grid>
            </Grid>

            <Dialog open={openModalPdf}>
                <ReciboModalFinal
                    tipo_comprobante={tipoComprobante}
                    nroDoc={nroDoc}
                    nombresRazon={nombresRazon}
                    telefono={telefono}
                    direccion={direccion}
                    observaciones={observaciones}
                    tipoPago={tipoPago}
                    medioPago={medioPago}
                    aCuenta={aCuenta}
                    saldo={saldo}
                    productos={productos}
                    sumaSubTotal={sumaSubTotal}
                    igv={igv}
                    sumaTotal={sumaTotal}
                    setOpenModalPdf={setOpenModalPdf}
                    setMsjAlertExitoso={setMsjAlertExitoso}
                    setSeverityAlert={setSeverityAlert}
                    setOpenAlertOk={setOpenAlertOk}
                />
            </Dialog>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <ReciboModal
                    setOpenEdit={setOpenEdit}
                    setOpenAlertOk={setOpenAlertOk}
                    setMsjAlertExitoso={setMsjAlertExitoso}
                    setSeverityAlert={setSeverityAlert}
                    productoSelect={productoSelect}
                    productos={productos}
                    reloadAllProducts={reloadAllProducts}
                />
            </Dialog>
            <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert} />

        </Grid>
    );
}
