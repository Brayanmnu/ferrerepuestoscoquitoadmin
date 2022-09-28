import React, { useState, useEffect, Fragment } from "react";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Link} from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function SideBar(props) {
  const { ...other } = props;

  const [openProduct, setOpenProduct] = useState(false);

  const handleClickDesplegableProduct = () => {
    setOpenProduct(!openProduct);
  };

  
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 15, color: '#fff' }} style={{justifyContent: 'center'}}>
            <img src="/logo-fyac.png" style={{maxWidth: "60px" , marginRight: "5px"}}/> Ferrerepuestos & Accesorios Coquito S.A.C.
          </ListItem>
        <Link key="home" to="/"  style={{ textDecoration: 'none' }}>
            <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText>Inicio</ListItemText>
            </ListItem>
        </Link>
          <Box sx={{ bgcolor: '#101F33' }}>
              <ListItem disablePadding key="Productos">
                <ListItemButton  sx={item} onClick={handleClickDesplegableProduct}>
                    <ListItemIcon><InventoryIcon /></ListItemIcon>
                    <ListItemText>Productos</ListItemText>
                    {openProduct ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openProduct} timeout="auto" unmountOnExit>
                <Link key="Productos" to="/products-dashboard/riego"  style={{ textDecoration: 'none', color:'white' }}>
                  <ListItem component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>Riego Tecnificado</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link key="Productos" to="/products-dashboard/ferreteria"  style={{ textDecoration: 'none', color:'white' }}>
                  <ListItem component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>Ferretería</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                <Link key="Productos" to="/products-dashboard/automotriz"  style={{ textDecoration: 'none', color:'white' }}>
                  <ListItem component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText>Automotriz</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Collapse>
            <Divider sx={{mt:2}} />
          </Box>
      </List>
    </Drawer>
  );
}