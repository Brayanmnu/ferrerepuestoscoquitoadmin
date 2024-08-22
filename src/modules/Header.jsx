import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

//Servicios
import { Server } from "../services/server";

function Header(props) {
  const { onDrawerToggle } = props;
  const [productsCart,setProductsCart]=React.useState(<div style={{padding:"12px",justifyContent:"center",display:"flex"}}><CircularProgress /></div>)
  const [cartMemory,setCartMemory]= React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorCart, setAnchorCart] = React.useState(null)
  const openAvatar = Boolean(anchorEl);
  const openCart = Boolean(anchorCart);
  const right = props.isSmUp? 14:65

  const server = new Server();
  const navigate = useNavigate();

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickCart = async (event) =>{
    setAnchorCart(event.currentTarget);
    var itemsCart = window.localStorage.getItem('cartMemory')!=null?JSON.parse(window.localStorage.getItem('cartMemory')):[]
    setCartMemory(itemsCart)

    //Se invoca a la api con los productos cargados
    
    //await props.getAllProductsCar()
    if(itemsCart.length>0){
      let precioTotal = 0
      let iterator=0
      
      setProductsCart(
        itemsCart.map((item) => {
            iterator +=1;
            let cantidad = item.cantidad
            precioTotal+=item.precio_unit * item.cantidad
            return(
              <div style={{padding:"10px"}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={10} sm={10} md={10}>
                    {cantidad} {item.descripcion_producto}
                  </Grid>
                  <Grid item xs={2} sm={2} md={2}>
                    <div style={{justifyContent:"right",display:"flex"}}>
                    S./{item.precio_unit * item.cantidad}
                    </div>
                      
                  </Grid>
                  {iterator== itemsCart.length?
                  <Grid item xs={12} sm={12} md={12}>
                    <Divider />
                    <Grid container style={{padding:"10px"}}>
                    <Divider />
                    <Grid item xs={10} sm={10} md={10}>
                      TOTAL
                    </Grid>
                    <Grid item xs={2} sm={2} md={2}>
                    <div style={{justifyContent:"right",display:"flex"}}>
                    S/.{precioTotal}
  
                    </div>
                    </Grid>
                  </Grid>
                  </Grid>
                  :null
                  }
              </Grid>
              </div>
            )
        })
      )
    }else{
      setProductsCart(
        <div style={{padding:"12px",justifyContent:"center",display:"flex"}}>
          No hay productos en el carrito.
        </div>
        
      )
    }
    
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };
  const handleCloseCart = () => {
    setAnchorCart(null);
  };
  const theme = createTheme({
      palette: {
        primary: {
          main: '#01579b',
        }
      },
  });

  async function handleVaciarCarrito() {
    setProductsCart(
      <div style={{padding:"12px",justifyContent:"center",display:"flex"}}>
        <CircularProgress />
      </div>
    )
    const tokenCoquito = window.localStorage.getItem('loggedCoquito')
    if (tokenCoquito && tokenCoquito.length>2){
      window.localStorage.removeItem('cartMemory')
      setProductsCart(
        <div style={{padding:"12px",justifyContent:"center",display:"flex"}}>
          No hay productos en el carrito.
        </div>
      )
      
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedCoquito')
    props.handleIsLogin();
  };

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
        <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid  item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            {/* <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
            <Grid item>
              <IconButton 
                color="inherit" 
                sx={{ p: 0.5 }} 
                onClick={handleClickCart}
                aria-controls={openCart ? 'cart-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openCart ? 'true' : undefined}
              >
                  <Badge badgeContent="C" color="secondary">
                    <ShoppingCartIcon/>
                  </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton 
                color="inherit" 
                sx={{ p: 0.5 }} 
                onClick={handleClickAvatar}
                aria-controls={openAvatar ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openAvatar ? 'true' : undefined}
              >
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAvatar}
        onClose={handleCloseAvatar}
        onClick={handleCloseAvatar}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" /> Cerrar Sesión
        </MenuItem>
      </Menu>
      
      <Menu
        anchorEl={anchorCart}
        id="cart-menu"
        open={openCart}
        onClose={handleCloseCart}
        onClick={handleCloseCart}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            overflowY: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 10,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: {right},
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {productsCart}
        <Divider />
        <div style={{justifyContent:"center",display:"flex", columnGap:"20px", paddingTop:"10px"}}>
          <div>
          <Button disabled={cartMemory.length==0} onClick={handleVaciarCarrito}  variant="outlined" color="error">Vaciar</Button>          </div>
          <div>
          <Button disabled={cartMemory.length==0} variant="contained"
            onClick={() => navigate("/recibo")}>
              Finalizar</Button>
          </div>
        </div>
        
        
      </Menu>
      
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;