import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { initialValuesRegister } from "../../initialsValues";
import { RegisterSchema } from "../../rules/registerRules";
import { Btn, Input } from "../../components";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { UseForm } from "../../components/form";
import { Link } from 'react-router-dom';
import { AuthRequest } from "../../services/AuthServices";

import { useDispatch } from 'react-redux'
import * as actionsCreators from "../../store/actions/auth.actions";

import { useHistory } from "react-router-dom";
import { setFormikErrors } from "../../helper";

const theme = createTheme();

export function Register() {

    const dispatch = useDispatch()
    let history = useHistory();


    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {

        dispatch(actionsCreators.Loading(true))
        try {
            const res = await AuthRequest.register({
                name: values.name,
                Rol: "Admin",
                email: values.email,
                password: values.password,
                storename : values.storename
            })

            if (!res.data.isAuthSuccessful) {

            } else {
                dispatch(actionsCreators.Store(res.data.data))
                dispatch(actionsCreators.Token(res.data.token))
                dispatch(actionsCreators.Loading(false))
                history.push('/dashboard')
            }
        } catch (err: any) {

            setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
        }

    }

    const formik = UseForm(initialValuesRegister, RegisterSchema, onSubmit)

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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Input
                                        autofocus={true}
                                        className="mt-3"
                                        error={formik.errors.name}
                                        label="Name *"
                                        name="name"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.name}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <Input
                                        autofocus={false}
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
                                        error={formik.errors.storename}
                                        label="Store's name *"
                                        name="storename"
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.storename}
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
                                    <Input
                                        autofocus={false}
                                        className="mt-3"
                                        error={formik.errors.confirmpassword}
                                        label="Confirm Password *"
                                        name="confirmpassword"
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.confirmpassword}
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

                                    <Link to="/" >if you have an account, please log in</Link>

                                </Grid>




                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </ThemeProvider>
    );
}