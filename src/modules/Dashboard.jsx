import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SideBar from './SideBar.jsx'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import ProductAdmin from './products/ProductAdmin'
import SocioClaveAdmin from './socio-clave/SocioClaveAdmin'
import VentasAdmin from './ventas/VentasAdmin'
import Home from './Home'
import Header from './Header';
import Recibo from './ventas/Recibo'

//Servicios
import { Server } from "../services/server";

let theme = createTheme({
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });
  
  theme = {
    ...theme,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#081627',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            boxShadow: 'none',
            '&:active': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            marginLeft: theme.spacing(1),
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            margin: '0 16px',
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up('md')]: {
              padding: 0,
              minWidth: 0,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1),
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 4,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(255,255,255,0.15)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#4fc3f7',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeightMedium,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'inherit',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            '& svg': {
              fontSize: 20,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 32,
            height: 32,
          },
        },
      },
    },
  };
  
  const drawerWidth = 0;

  
export default function Dashboard(props){
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cantidadCart,setCantidadCart]=useState(0)

    const server = new Server();

    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleIsLogin = () => {
      props.setIsLogin(false)
    }

    useEffect(() => {
    }, [,]);
  
    return (
      <ThemeProvider theme={theme}>
        
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        
          <CssBaseline />
          
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {/* {(isSmUp) ? null : (
              <SideBar
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )} */}
            <SideBar
                PaperProps={{ style: { width: 200 } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{ display: { sm: 'block', xs: 'block' } }}
              />
            {/* <SideBar
              PaperProps={{ style: { width: drawerWidth } }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
              /> */}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} handleIsLogin={handleIsLogin}  isSmUp={isSmUp}/>
                <Box component="main" sx={{ flex: 1, py: 2, px: 3, bgcolor: '#eaeff1' }}>
                <Routes>
                    <Route path={'/'} exact element={<Home mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle}/>} />
                    <Route path={'/products-dashboard/:productType'} exact element={<ProductAdmin mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} setCantidadCart={setCantidadCart} isSmUp={isSmUp}/>}/>
                    <Route path={'/socios-clave'} exact element={<SocioClaveAdmin  isSmUp={isSmUp}/>}/>
                    <Route path={'/caja-dashboard/ventas'} exact element={<VentasAdmin mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle}  isSmUp={isSmUp}/>}/>
                    <Route path={'/recibo'} exact element={<Recibo/>} />
                    <Route path={'/products-list/:codeQr'} exact element={<ProductAdmin setCantidadCart={setCantidadCart} isSmUp={isSmUp}/>}/>
                </Routes>              
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }