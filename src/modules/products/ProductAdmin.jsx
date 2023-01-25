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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from "@mui/material/Pagination";
import IconButton from '@mui/material/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//Servicios
import { Server } from "../../services/server";

//Vistas
import ProductAdminModal from "./ProductAdminModal";
import ProductAdminQrModal from "./ProductAdminQrModal";
import ProductAdminModalEliminar from "./ProductAdminModalEliminar";

//componentes
import Alert from '../../components/Alert'
import AddProduct from "../../components/AddProduct";

export default function ProductAdmin(props) {
    const { productType, codeQr } = useParams()

    const server = new Server();
    const [tableBody, setTableBody] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openQr, setOpenQr] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [idProductoQr, setIdProductQr] = useState("");
    const [isCreate, setIsCreate] = useState(true);
    const [titleModal, setTitleModal] = useState("");
    const [componentTableResponsive, setComponentTableResponsive] = useState("");
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');

    const [subTipoProduct, setSubTipoProduct] = useState('');
    const [deProduct, setDeProduct] = useState('');
    const [aProduct, setAProduct] = useState('');

    const [cantPaginas, setCantPaginas] = useState(0)
    const [page, setPage] = useState(1);
    const [menuItemSubProductType, setMenuItemSubProductType] = useState('');
    const [menuItemMedidaDe, setMenuItemMedidaDe] = useState('');
    const [menuItemMedidaA, setMenuItemMedidaA] = useState('');
    const [disabledDe, setDisabledDe] = useState(true);
    const [disabledA, setDisabledA] = useState(true);
    const [precioXMayor, setPrecioXMayor] = useState(0);
    const [precioXMenor, setPrecioXMenor] = useState(0);
    const [nombreProduct, setNombreProduct] = useState('');
    const [openAddProduct, setOpenAddProduct] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2FC6B1',
            },
            warning: {
                main: '#fbc02d'
            },
            addReg: {
                main: '#0d47a1',
                contrastText: '#fff',
            },
            cart: {
                main: '#673ab7',
            }
        },
    });

    const columns = [
        { id: 'stock', align: 'center', label: 'Stock', minWidth: 170, format: 'string' },
        { id: 'nombre', align: 'center', label: 'Nombre', minWidth: 170, format: 'string' },
        { id: 'precio_venta', align: 'center', label: 'Rango precio venta', minWidth: 170, format: (value) => value.toFixed(2) },
        { id: 'precio_compra', align: 'center', label: 'Precio compra', minWidth: 170, format: (value) => value.toFixed(2) }
    ];

    async function reloadSubProductType() {

        const subProductAll = await server.getAllSubProductType(getIdProductType());
        const arraySubTipoProducto = await subProductAll.data;
        setMenuItemSubProductType(
            arraySubTipoProducto.map((tp) => {
                return (
                    <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                )

            })
        )
    }

    async function reloadMedidaDe(id) {
        const medidaDe = await server.getMedidaDe(id);
        const arrayMedidaDe = await medidaDe.data;
        if (arrayMedidaDe.length > 0) {
            setDisabledDe(false)
            setMenuItemMedidaDe(
                arrayMedidaDe.map((tp) => {
                    return (
                        <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                    )
                })
            )
        } else {
            setDisabledDe(true)
            setDeProduct('')
        }
    }


    async function reloadMedidaA(id) {
        const medidaA = await server.getMedidaA(id);
        const arrayMedidaA = await medidaA.data;
        if (arrayMedidaA.length > 0) {
            setDisabledA(false)
            setMenuItemMedidaA(
                arrayMedidaA.map((tp) => {
                    return (
                        <MenuItem value={tp.id}>{tp.descripcion}</MenuItem>
                    )
                })
            )
        } else {
            setDisabledA(true)
            setAProduct('')
        }
    }

    function getIdProductType() {
        if (productType == "riego") {
            return '1'
        } else if (productType == "ferreteria") {
            return '2'
        } else if (productType == "automotriz") {
            return '3'
        }
    }

    async function reloadAllProducts(nroPag, idSubProductType, deRequest, aRequest) {
        const productAll = await server.getAllProducts(nroPag, codeQr, getIdProductType(), idSubProductType, deRequest, aRequest);
        if (productAll.status === 200) {
            var rowsProduct = await productAll.data;
            var cantPaginas = 0;

            setTableBody(
                <TableBody>
                    {rowsProduct.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10);
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                <TableCell key="stock" align="center">
                                    {row.stock} {row.uni_medida}
                                </TableCell>
                                <TableCell key="nombre">
                                    {row.nombre}
                                </TableCell>
                                <TableCell key="precio_venta" align="center">
                                    S/ {row.precio_venta_menor} - S/ {row.precio_venta_mayor}
                                </TableCell>
                                <TableCell key="precio_compra" align="center">
                                    S/ {row.precio_compra}
                                </TableCell>
                                <TableCell key="options">
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
                                        <ThemeProvider theme={theme}>
                                            {
                                                codeQr === undefined ?
                                                    <div style={{ justifyContent: "center", display: "flex" }}>
                                                        <Grid item xs={4} sm={2} md={4}>
                                                            <IconButton aria-label="addCart" color="cart" value={JSON.stringify(row)} variant="contained" onClick={handleClickOpenAddProduct}><AddShoppingCartIcon fontSize="medium" /></IconButton>
                                                        </Grid>
                                                        <Grid item xs={4} sm={2} md={4}>
                                                            <IconButton aria-label="qr" color="primary" value={row.id_producto} variant="contained" onClick={handleClickOpenQr}><QrCodeScannerIcon fontSize="medium" /></IconButton>
                                                        </Grid>
                                                        <Grid item xs={4} sm={2} md={4}>
                                                            <IconButton aria-label="edit" color="warning" value={row.id_producto} onClick={handleClickOpenUpdate}><EditIcon fontSize="medium" /></IconButton>
                                                        </Grid>
                                                        <Grid item xs={4} sm={2} md={4}>
                                                            <IconButton aria-label="delete" color="error" value={row.id_producto} onClick={handleClickOpenDelete}><DeleteIcon fontSize="medium" /></IconButton>
                                                        </Grid>
                                                    </div> :
                                                    null
                                            }

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
                    {rowsProduct.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10);
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>
                                    <div>Stock: {row.stock} {row.uni_medida}</div>
                                    <div>Nombre: {row.nombre}</div>
                                    <div>Rango Precio venta: S/ {row.precio_venta_menor} - S/ {row.precio_venta_mayor}</div>
                                    <div>Precio compra: S/ {row.precio_compra}</div>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <ThemeProvider theme={theme}>
                                            {
                                                codeQr === undefined ?
                                                    <Grid container style={{paddingTop:"12px"}}>
                                                        <Grid item xs={4} sm={2} md={4}>
                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                <IconButton aria-label="addCart" color="cart" value={JSON.stringify(row)} variant="contained" onClick={handleClickOpenAddProduct}><AddShoppingCartIcon fontSize="medium" /></IconButton>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} md={4}>
                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                <IconButton aria-label="qr" color="primary" value={row.id_producto} onClick={handleClickOpenQr}><QrCodeScannerIcon fontSize="medium" /></IconButton>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} md={4}>
                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                <IconButton aria-label="edit" color="warning" value={row.id_producto} onClick={handleClickOpenUpdate}><EditIcon fontSize="medium" /></IconButton>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} md={4}>
                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                <IconButton aria-label="delete" color="error" value={row.id_producto} onClick={handleClickOpenDelete}><DeleteIcon fontSize="medium" /></IconButton>
                                                            </div>
                                                        </Grid>
                                                    </Grid> : null
                                            }
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


    const handleChangeSubTipo = (event) => {
        setSubTipoProduct(event.target.value);
        reloadMedidaDe(event.target.value);
        reloadMedidaA(event.target.value);
    };

    const handleChangeDe = (event) => {
        setDeProduct(event.target.value);
    };
    const handleChangeA = (event) => {
        setAProduct(event.target.value);
    };

    const handleClickOpenCreate = () => {
        setTitleModal("Registrar producto")
        setOpenCreate(true);
        setIsCreate(true);
    };

    const handleClickOpenUpdate = (event) => {
        setTitleModal("Actualizar producto")
        setOpenCreate(true);
        setIsCreate(false);
        setIdProductQr(event.currentTarget.value);
    };

    const handleClickOpenDelete = (event) => {
        setOpenDelete(true);
        setIdProductQr(event.currentTarget.value);
    };

    const handleClickOpenQr = (event) => {
        setOpenQr(true);
        setIdProductQr(event.currentTarget.value);
    };

    const handleClickOpenAddProduct = (event) => {
        const productSelect = JSON.parse(event.currentTarget.value)
        setOpenAddProduct(true);
        setIdProductQr(productSelect.id_producto);
        setPrecioXMayor(productSelect.precio_venta_mayor)
        setPrecioXMenor(productSelect.precio_venta_menor)
        setNombreProduct(productSelect.nombre)
    };

    useEffect(() => {
        setSubTipoProduct('')
        setAProduct('')
        setDeProduct('')
        setDisabledA(true)
        setDisabledDe(true)
        if (codeQr === undefined) {
            reloadSubProductType()
        }
        reloadAllProducts(0, "", "", "")

    }, [productType,]);


    async function aplicarFiltro() {
        reloadAllProducts(0, subTipoProduct, deProduct, aProduct)
        setPage(1);
    }

    async function clearFiltro() {
        setSubTipoProduct('')
        setDeProduct('')
        setAProduct('')
        reloadAllProducts(0, "", "", "")
        setPage(1);
        setDisabledDe(true)
        setDisabledA(true)
    }


    const handleChangePagina = (event, value) => {
        reloadAllProducts((value - 1) * 10, subTipoProduct, deProduct, aProduct)
        setPage(value);
    };


    return (
        <Grid container rowSpacing={2}>
            {
                codeQr === undefined ?
                    <Grid item xs={12} xm={12} md={12}>
                        <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }} style={{ padding: "6px" }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    Filtros
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Subtipo</InputLabel>
                                        <Select
                                            labelId="subtipo-label"
                                            id="subtipo-label"
                                            value={subTipoProduct}
                                            label="Subtipo"
                                            onChange={handleChangeSubTipo}
                                            fullWidth
                                        >
                                            {menuItemSubProductType}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {!disabledDe ?
                                    <Grid item xs={6} sm={2} md={2}>
                                        <FormControl fullWidth>
                                            <InputLabel>De</InputLabel>
                                            <Select
                                                labelId="de-label"
                                                id="de-label"
                                                value={deProduct}
                                                label="de"
                                                onChange={handleChangeDe}
                                                fullWidth
                                                disabled={disabledDe}
                                            >
                                                {menuItemMedidaDe}
                                            </Select>
                                        </FormControl>
                                    </Grid> : null}
                                {!disabledA ?
                                    <Grid item xs={6} sm={2} md={2}>
                                        <FormControl fullWidth>
                                            <InputLabel>A</InputLabel>
                                            <Select
                                                labelId="a-label"
                                                id="a-label"
                                                value={aProduct}
                                                label="A"
                                                onChange={handleChangeA}
                                                fullWidth
                                                disabled={disabledA}
                                            >
                                                {menuItemMedidaA}
                                            </Select>
                                        </FormControl>
                                    </Grid> : null}
                                <Grid item xs={12} sm={2} md={2} >
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
                    </Grid> : null
            }
            {
                codeQr === undefined ?
                    <Grid item xs={12} sm={3} md={3}>
                        <ThemeProvider theme={theme}>
                            <div style={{ justifyContent: (props.isSmUp) ? "left" : "center", display: "flex" }}>
                                <Button variant="contained" sx={{ mr: 1 }} color="addReg" onClick={handleClickOpenCreate}>
                                    Registrar
                                </Button>
                            </div>

                        </ThemeProvider>
                    </Grid> : null
            }

            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
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
                                                {
                                                    codeQr == undefined ?
                                                        <TableCell key="acciones" align="center" style={{ minWidth: "40" }}>
                                                            Acciones
                                                        </TableCell> : null
                                                }
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
                    <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                        <ProductAdminModal
                            title={titleModal}
                            setOpenCreate={setOpenCreate}
                            setOpenAlertOk={setOpenAlertOk}
                            setMsjAlertExitoso={setMsjAlertExitoso}
                            setSeverityAlert={setSeverityAlert}
                            isCreate={isCreate}
                            idProducto={idProductoQr}
                            reloadAllProducts={reloadAllProducts}
                            idTipoProduct={getIdProductType()}
                            menuSubProduct={menuItemSubProductType}
                        />
                    </Dialog>
                    <Dialog open={openQr} onClose={() => setOpenQr(false)}>
                        <ProductAdminQrModal
                            setOpenCreate={setOpenQr}
                            idProductoQr={idProductoQr} />
                    </Dialog>
                    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                        <ProductAdminModalEliminar
                            setOpenDelete={setOpenDelete}
                            idProducto={idProductoQr}
                            setOpenAlertOk={setOpenAlertOk}
                            setMsjAlertExitoso={setMsjAlertExitoso}
                            setSeverityAlert={setSeverityAlert}
                            reloadAllProducts={reloadAllProducts} />
                    </Dialog>
                    <Dialog open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
                        <AddProduct
                            setOpenAddProduct={setOpenAddProduct}
                            idProducto={idProductoQr}
                            precioXMayor={precioXMayor}
                            precioXMenor={precioXMenor}
                            nombreProduct={nombreProduct}
                            setOpenAlertOk={setOpenAlertOk}
                            setMsjAlertExitoso={setMsjAlertExitoso}
                            setCantidadCart={props.setCantidadCart}
                            setSeverityAlert={setSeverityAlert} />
                    </Dialog>
                    <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert} />
                </Paper>
            </Grid>
        </Grid>
    );
}