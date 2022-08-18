import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../img/login.jpg'; // Import using relative path
import { UserService } from "../services/UserService";
import Alert  from './Alert'

export default function ThemeLogin(props) {

    
    const theme = createTheme();
    const [openError, setOpenError] = React.useState(false);

    const userService = new UserService();
    async function handleSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credentials = {
            email: data.get('email'),
            password: data.get('password')
        }
        const loginResponse =  await userService.login(credentials);
        if (loginResponse.status === 200){
            const loginResponseData = await loginResponse.data; 
            if(loginResponseData.status=="1"){
                props.setIsLogin(true)
                window.localStorage.setItem(
                    'loggedCoquito' , JSON.stringify(loginResponseData)
                )
            }else{
                setOpenError(true);
            }
        }else{
            setOpenError(true);
        }
    };

    
  return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(${Image})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Ingresar
                </Button>
                </Box>
            </Box>
            </Grid>
            <Alert openError={openError} setOpenError={setOpenError} mensaje="Credenciales incorrectas" severity="error"/>
      </Grid>
    </ThemeProvider>
  );
}