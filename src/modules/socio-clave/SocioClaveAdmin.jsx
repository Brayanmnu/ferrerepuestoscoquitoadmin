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
import EditIcon from '@mui/icons-material/Edit';
import SocioClaveModal from "./SocioClaveModal"
import SocioClaveModalEliminar from "./SocioClaveModalEliminar"
//Servicios
import { Server } from "../../services/server";

//componentes
import Alert from '../../components/Alert'

export default function SocioClaveAdmin(props) {

    const server = new Server();
    const [titleModal, setTitleModal] = useState("");
    const [openCreate, setOpenCreate] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [componentTableResponsive, setComponentTableResponsive] = useState("");
    const [cantPaginas,setCantPaginas] = useState(0)
    const [page, setPage] = useState(1);
    const [tableBody, setTableBody] = useState();
    const [openDelete, setOpenDelete] = useState(false);
    const [openAlertOk, setOpenAlertOk] = useState(false);
    const [msjAlertExitoso, setMsjAlertExitoso] = useState('');
    const [severityAlert, setSeverityAlert] = useState('');
    const [socioId, setSocioId] = useState('');


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
        { id: 'tipo_socio',align: 'center', label: 'Tipo de socio', minWidth: 170, format: 'string' },
        { id: 'nro_doc',align: 'center', label: 'Nro. Documento', minWidth: 170, format: 'string' },
        { id: 'nombre_razon',align: 'center', label: 'Nombres o Razon Social', minWidth: 170 , format: 'string'},
        { id: 'direccion',align: 'center', label: 'Dirección', minWidth: 170, format: 'string'},
        { id: 'contacto',align: 'center', label: 'Contacto', minWidth: 170, format: 'string'},
        { id: 'acciones',align: 'center', label: 'Acciones', minWidth: 40 , format: "string"}
    ];
    
    async function reloadAllSocioClave(nroPag) {
        
        const socioAll =  await server.getAllSocioClave(nroPag);
        if (socioAll.status === 200){
            var rowsSocio = await socioAll.data;
            var cantPaginas=0;

            setTableBody(
                <TableBody>
                    {rowsSocio.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10 );
                        setCantPaginas(cantPaginas)
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id_producto}>
                                <TableCell key="tipo_socio">
                                    {row.tipo_socio} 
                                </TableCell>
                                <TableCell key="nro_doc">
                                    {row.nro_doc}
                                </TableCell>
                                <TableCell key="nombre_razon">
                                    {row.nombre_razon}
                                </TableCell>
                                <TableCell key="direccion">
                                    {row.direccion}
                                </TableCell>
                                <TableCell key="contacto">
                                    {row.contacto}
                                </TableCell>
                                <TableCell key="options">
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
                                    <ThemeProvider theme={theme}>
                                    <div style={{justifyContent:"center",display:"flex"}}>
                                            <Grid item xs={4} sm={2} md={4}>
                                                <IconButton aria-label="edit" color="warning" value={row.id_socio_clave} onClick={handleClickOpenUpdate}><EditIcon fontSize="medium"/></IconButton>
                                            </Grid>
                                            <Grid item xs={4} sm={2} md={4}>
                                                <IconButton aria-label="delete" color="error" value={row.id_socio_clave} onClick={handleClickOpenDelete}><DeleteIcon fontSize="medium"/></IconButton>
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
                    {rowsSocio.map((row) => {
                        cantPaginas = Math.ceil(row.total_elements / 10 );
                        setCantPaginas(cantPaginas)
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell>
                                    <div>Tipo de Socio: {row.tipo_socio}</div>
                                    <div>Nro. Documento: {row.nro_doc}</div>
                                    <div>Nombres o Razon Social: {row.nombre_razon}</div>
                                    <div>Dirección: {row.direccion}</div>
                                    <div>Contacto: {row.contacto}</div>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                                        <ThemeProvider theme={theme}>
                                            <Grid item xs={4} sm={4} md={4}>
                                            <div style={{justifyContent:"center",display:"flex"}}>
                                                <IconButton aria-label="edit" color="warning" value={row.id_socio_clave} onClick={handleClickOpenUpdate}><EditIcon fontSize="medium"/></IconButton>
                                            </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4} md={4}>
                                            <div style={{justifyContent:"center",display:"flex"}}>
                                                <IconButton aria-label="delete" color="error" value={row.id_socio_clave} onClick={handleClickOpenDelete}><DeleteIcon fontSize="medium"/></IconButton>
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
        setTitleModal("Registrar Socio Clave")
        setOpenCreate(true);
        setIsCreate(true);
    };

    const handleClickOpenUpdate = (event) => {
        setTitleModal("Actualizar Socio Clave")
        setOpenCreate(true);
        setIsCreate(false);
        setSocioId(event.currentTarget.value);
    };

    const handleClickOpenDelete = (event) => {
        setOpenDelete(true);
        setSocioId(event.currentTarget.value);
    };
    
    
    const handleChangePagina = (event, value) => {
        reloadAllSocioClave((value-1)*10) 
        setPage(value);
    };

    useEffect(() => {
        reloadAllSocioClave(0) 
    }, [,]);

    return(
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
                    <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                        <SocioClaveModal
                            isCreate={isCreate} 
                            idSocio={socioId}
                            setOpenCreate={setOpenCreate} 
                            setMsjAlertExitoso={setMsjAlertExitoso} 
                            setSeverityAlert={setSeverityAlert} 
                            setOpenAlertOk={setOpenAlertOk} 
                            reloadAllSocioClave={reloadAllSocioClave} 
                            title={titleModal} 
                        />
                    </Dialog>
                    <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                        <SocioClaveModalEliminar 
                            setOpenDelete={setOpenDelete} 
                            idSocio={socioId} 
                            setOpenAlertOk={setOpenAlertOk} 
                            setMsjAlertExitoso={setMsjAlertExitoso} 
                            setSeverityAlert={setSeverityAlert}
                            reloadAllSocioClave={reloadAllSocioClave}/>
                    </Dialog>
                    <Alert openAlert={openAlertOk} setOpenAlert={setOpenAlertOk} mensaje={msjAlertExitoso} severity={severityAlert}/>
                </Paper>
            </Grid>
        </Grid>
    );
}