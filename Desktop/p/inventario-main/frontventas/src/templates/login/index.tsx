import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { initialValuesLogin } from "../../initialsValues";
import { LoginSchema } from "../../rules/loginRules";
import { Btn, Input, Snackbars } from "../../components";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { UseForm } from "../../components/form";
import { AuthRequest } from "../../services/AuthServices";
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import * as actionsCreators from "../../store/actions/auth.actions";

import { useHistory } from "react-router-dom";

const theme = createTheme();

export function SignInSide() {

    const dispatch = useDispatch()
    let history = useHistory();


    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");

    
  
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
      };

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        
        dispatch(actionsCreators.Loading(true))

        const res = await AuthRequest.auth({
            email : values.email,
            password : values.password
        })

        if(!res.isAuthSuccessful){
            setSeverity("error")
            setMsg(res.errorMessage)
            dispatch(actionsCreators.Loading(false))
            handleClick()
        }else{
            dispatch(actionsCreators.Store(res.data))
            dispatch(actionsCreators.Token(res.token))
            dispatch(actionsCreators.Loading(false))
            history.push('/dashboard')
        }

        
    }

    
    
  

    const formik = UseForm(initialValuesLogin, LoginSchema, onSubmit)

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
                        backgroundImage: 'url(https://cocinandoconerica.com/wp-content/uploads/2021/04/Empanadas-colombianas-de-pollo-Cocinando-con-Erica.jpg)',
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
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Input
                                        autofocus={true}
                                        className="mt-3"
                                        error={formik.errors.email}
                                        label="Email *"
                                        name="email"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.email}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Input
                                        autofocus={false}
                                        className="mt-3"
                                        error={formik.errors.password}
                                        label="Password *"
                                        name="password"
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.password}
                                    />

                                </Grid>

                                <Grid item xs={12}>

                                    <Btn
                                        disabled={false}
                                        className=""
                                        type="submit"
                                        variant="contained"
                                        text="Enviar"
                                    />

                                </Grid>

                               

                                <Grid item xs={12}>

                                   <Link to="/register" >Dont have an account?, please register</Link>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbars
                msg={msg}
                open={open}
                severity={severity}
                handleClose={handleClose}
            />
        </ThemeProvider>
    );
}