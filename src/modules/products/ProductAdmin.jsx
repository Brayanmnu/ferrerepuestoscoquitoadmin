import React, { useState, useEffect, Fragment } from "react";
//Imports material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Paper from '@mui/material/Paper';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {useParams } from 'react-router-dom'

//Servicios
import { ProductoService } from "../../services/ProductoService";

//Vistas
import ProductAdminModal from "./ProductAdminModal";
import ProductAdminQrModal from "./ProductAdminQrModal";
import ProductAdminModalEliminar from "./ProductAdminModalEliminar";

//componentes
import SearchComponent from '../../components/SearchComponent'
import Alert from '../../components/Alert'

export default function ProductAdmin(props) {
    const { productType } = useParams()

    const productoService = new ProductoService();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableBody, setTableBody] = useState();
    const [openCreate, setOpenCreate] = useState(false);
    const [openQr, setOpenQr] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [tableFooter, setTableFooter] = useState('');
    const [searched, setSearched] = useState("");
    const [idProductoQr, setIdProductQr] = useState("");
    const [isCreate, setIsCreate] = useState(true);
    const [titleModal, setTitleModal] = useState("");
    const [componentTableResponsive, setComponentTableResponsive] = useState("");
    const [textSearch, setTextSearch] = useState('');
    const [tableData, setTableData] = useState();
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');
    

    const theme = createTheme({
        palette: {
          primary: {
            main: '#6abf69',
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
        { id: 'nombre',align: 'center', label: 'Nombre', minWidth: 170 , format: 'string'},
        { id: 'categoria',align: 'center', label: 'Categoria', minWidth: 170, format: 'string' },
        { id: 'stock',align: 'center', label: 'Stock', minWidth: 170, format: 'string' },
        { id: 'precio_venta_menor',align: 'center', label: 'Precio venta X menor', minWidth: 170, format: (value) => value.toFixed(2) },
        { id: 'descripcion',align: 'center', label: 'Descripcion', minWidth: 170, format: 'string' },
        { id: 'precio_compra',align: 'center', label: 'Precio compra', minWidth: 170, format: (value) => value.toFixed(2)},
        { id: 'precio_venta_mayor',align: 'center', label: 'Precio venta X mayor', minWidth: 170 , format: (value) => value.toFixed(2)},
        { id: 'acciones',align: 'center', label: 'Acciones', minWidth: 240 , format: "string"}
    ];

    
    var rows = [];

    async function reloadAllProducts() {
        setTextSearch('');
        const productAll =  await productoService.getAllProducts();
        if (productAll.status === 200){
            const rowsDentro = await productAll.data;
            rows = rowsDentro;
            
            setTableBody(
                <TableBody>
                        {rows
                        //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                        .map((row) => {
                            if(row.estado=="1"){
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                        <TableCell key="nombre">
                                            {row.nombre}
                                        </TableCell>
                                        <TableCell key="categoria">
                                            {row.categoria}
                                        </TableCell>
                                        <TableCell key="stock">
                                            {row.stock} {row.uni_medida}
                                        </TableCell>
                                        <TableCell key="precio_venta_menor">
                                            S/ {row.precio_venta_menor}
                                        </TableCell>
                                        <TableCell key="descripcion">
                                            {row.descripcion}
                                        </TableCell>
                                        <TableCell key="precio_compra">
                                            S/ {row.precio_compra}
                                        </TableCell>
                                        <TableCell key="precio_venta_mayor">
                                            S/ {row.precio_venta_mayor}
                                        </TableCell>
                                        <TableCell key="options">
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                                <ThemeProvider theme={theme}>
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Button color="primary"  variant="contained" value={row.id_producto} onClick={handleClickOpenQr} size="small">QR</Button>                                
                                                    </Grid>
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Button color="warning" variant="contained" value={row.id_producto} onClick={handleClickOpenUpdate} size="small">Editar</Button>
                                                    </Grid>
                                                    <Grid item xs={4} sm={4} md={4}>
                                                        <Button color="error"  variant="contained" value={row.id_producto} onClick={handleClickOpenDelete} size="small">Eliminar</Button>
                                                    </Grid>
                                                </ThemeProvider>
                                                
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    );
                            }
                        })}
                    </TableBody>
            );

            
            setComponentTableResponsive(
                <Table>
                    {rows.map((row) => {
                        if(row.estado=="1"){
                            return(
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell>
                                        <div>Nombre: {row.nombre}</div>
                                        <div>Categoria: {row.categoria}</div>
                                        <div>Stock: {row.stock} {row.uni_medida}</div>
                                        <div>Precio venta X menor: S/ {row.precio_venta_menor}</div>
                                        <div>Descripcion: {row.descripcion}</div>
                                        <div>Precio compra: S/ {row.precio_compra}</div>
                                        <div>Precio venta X mayor: S/ {row.precio_venta_mayor}</div>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                            <ThemeProvider theme={theme}>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="primary"  variant="contained" value={row.id_producto} onClick={handleClickOpenQr} size="small">QR</Button>                                
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="warning" variant="contained" value={row.id_producto} onClick={handleClickOpenUpdate} size="small">Editar</Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="error"  variant="contained" value={row.id_producto} onClick={handleClickOpenDelete} size="small">Eliminar</Button>
                                                </Grid>
                                            </ThemeProvider>
                                        </Grid>
                                    </TableCell>
                                    
                                </TableRow>
                            )
                        }
                        
                    })}
                </Table>
            )

            /*setTableFooter(
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );*/
            setTableData(rows)
        }
    }

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
        setIdProductQr(event.target.value);
    };

    const handleClickOpenDelete = (event) => {
        setOpenDelete(true);
        setIdProductQr(event.target.value);
    };


    const handleClickOpenQr = (event) => {
        setOpenQr(true);
        setIdProductQr(event.target.value);
    };

    useEffect(() => {
        reloadAllProducts()
        console.log('productType: '+productType)
    }, [productType,]);
    
    const searchChange = (event) => {
        const rowInterno = tableData;
        setTableBody(
            <TableBody>
                    {rowInterno
                    .map((row) => {
                        var nombre = row.nombre;
                        nombre = nombre.toUpperCase();
                        const valueTarget = textSearch; //event.target.value 
                        if(nombre.includes(valueTarget.toUpperCase()) && row.estado=="1"){
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                    <TableCell key="nombre">
                                        {row.nombre}
                                    </TableCell>
                                    <TableCell key="categoria">
                                        {row.categoria}
                                    </TableCell>
                                    <TableCell key="stock">
                                        {row.stock} {row.uni_medida}
                                    </TableCell>
                                    <TableCell key="precio_venta_menor">
                                        S/ {row.precio_venta_menor}
                                    </TableCell>
                                    <TableCell key="descripcion">
                                        {row.descripcion}
                                    </TableCell>
                                    <TableCell key="precio_compra">
                                       S/ {row.precio_compra}
                                    </TableCell>
                                    <TableCell key="precio_venta_mayor">
                                        S/ {row.precio_venta_mayor}
                                    </TableCell>
                                    <TableCell key="options">
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                            <ThemeProvider theme={theme}>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="primary"  variant="contained" value={row.id_producto} onClick={handleClickOpenQr} size="small">QR</Button>                                
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="warning" variant="contained" value={row.id_producto} onClick={handleClickOpenUpdate} size="small">Editar</Button>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4}>
                                                    <Button color="error"  variant="contained" value={row.id_producto} onClick={handleClickOpenDelete} size="small">Eliminar</Button>
                                                </Grid>
                                            </ThemeProvider>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                );
                        }
                    })}
                </TableBody>
        );

        
        
        setComponentTableResponsive(
            <Table>
                {rowInterno.map((row) => {
                    var nombre = row.nombre;
                    nombre = nombre.toUpperCase();
                    const valueTarget = textSearch// event.target.value 
                    if(nombre.includes(valueTarget.toUpperCase()) && row.estado=="1"){
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>
                                    <div>Nombre: {row.nombre}</div>
                                    <div>Categoria: {row.categoria}</div>
                                    <div>Stock: {row.stock} {row.uni_medida}</div>
                                    <div>Precio venta X menor: S/ {row.precio_venta_menor}</div>
                                    <div>Descripcion: {row.descripcion}</div>
                                    <div>Precio compra: S/ {row.precio_compra}</div>
                                    <div>Precio venta X mayor: S/ {row.precio_venta_mayor}</div>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <ThemeProvider theme={theme}>
                                            <Grid item xs={4} sm={4} md={4}>
                                                <Button color="primary"  variant="contained" value={row.id_producto} onClick={handleClickOpenQr} size="small">QR</Button>                                
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4}>
                                                <Button color="warning" variant="contained" value={row.id_producto} onClick={handleClickOpenUpdate} size="small">Editar</Button>
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4}>
                                                <Button color="error"  variant="contained" value={row.id_producto} onClick={handleClickOpenDelete} size="small">Eliminar</Button>
                                            </Grid>
                                        </ThemeProvider>
                                    </Grid>
                                </TableCell>
                                
                            </TableRow>
                        )
                    }
                })}
            </Table>
        )
    };

    return(
        <Grid container rowSpacing={2}>
            <Grid item xs={3} sm={3} md={3}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" sx={{ mr: 1 }} color="addReg" onClick={handleClickOpenCreate}>
                        Registrar
                    </Button>
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} xm={12} md={12}>
                <Paper sx={{maxWidth: 970, margin: 'auto', overflow: 'hidden' }}>
                    <SearchComponent reloadAllProducts={reloadAllProducts} searchChange={searchChange} setTextSearch={setTextSearch} textSearch={textSearch}/>
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
                                {tableFooter}
                            </Grid>
                        </Grid>
                    ) : (
                        <TableContainer>
                            {componentTableResponsive}
                        </TableContainer>
                        
                    )
                    }
                    <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                        <ProductAdminModal
                            title={titleModal} 
                            setOpenCreate={setOpenCreate} 
                            setOpenAlertOk={setOpenAlertOk} 
                            setMsjAlertExitoso={setMsjAlertExitoso} 
                            setSeverityAlert={setSeverityAlert} 
                            isCreate={isCreate} 
                            idProducto={idProductoQr}
                            reloadAllProducts={reloadAllProducts} />
                    </Dialog>
                    <Dialog open={openQr} onClose={() => setOpenQr(false)}>
                        <ProductAdminQrModal 
                        setOpenCreate={setOpenQr} 
                        idProductoQr={idProductoQr}/>
                    </Dialog>
                    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                        <ProductAdminModalEliminar 
                            setOpenDelete={setOpenDelete} 
                            idProducto={idProductoQr} 
                            setOpenAlertOk={setOpenAlertOk} 
                            setMsjAlertExitoso={setMsjAlertExitoso} 
                            setSeverityAlert={setSeverityAlert}
                            reloadAllProducts={reloadAllProducts}/>
                    </Dialog>
                    <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert}/>
                </Paper>
            </Grid>
        </Grid>
    );
}