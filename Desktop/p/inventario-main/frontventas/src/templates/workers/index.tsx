
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { WorkersRequest } from "../../services/WorkersService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FormWorkers } from "./formworkers";

export function Workers() {
    const Storeid = useSelector((state: any) => state.AuthReducer.store);
    const [users, setUsers] = useState([]);

    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);

    const[refresh, setrefresh] = useState(false)

    useEffect(() => {
        //console.log(WorkersRequest.getworker(1));
        WorkersRequest.getworker(Storeid).then(e => setUsers(e.data))
    },[refresh, Storeid])
    return (
        <TableContainer component={Paper}>
            <Button onClick={handleOpenmodal}>Add workers</Button>
            <Table size="medium" sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((data: any) => (
                            <TableRow
                                key={data.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data.id}
                                </TableCell>
                                <TableCell align="right">{data.name}</TableCell>
                                <TableCell align="right">{data.email}</TableCell>
                            </TableRow>

                        ))
                    }
                 
                </TableBody>
            </Table>
            <FormWorkers
              open={openmodal}
              handleClose={handleClosemodal}
              refresh={refresh}
              setrefresh={setrefresh}
             />
        </TableContainer>
    )
}



/*import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { initialValuesWorkers } from "../../initialsValues";
import { WorkersSchema } from "../../rules/workersRules";
import { Btn, Input, Snackbars } from "../../components";
import { UseForm } from "../../components/form";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { WorkersRequest } from "../../services/WorkersService";


import { useDispatch, useSelector } from 'react-redux'
import * as actionsCreators from "../../store/actions/auth.actions";
import React from 'react';
import { setFormikErrors } from "../../helper";*/


/*
export function Workers() {
    const dispatch = useDispatch()
    const storeId = useSelector((state : any)  => state.AuthReducer.store);
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
        try{
            const res = await WorkersRequest.worker({
                name: values.name,
                Rol: "Repartidor",
                email: values.email,
                password: "Jaime123",
                storeId : storeId
            })

            if(!res.isAuthSuccessful){
                setSeverity("error")
                setMsg(res.errorMessage)
                dispatch(actionsCreators.Loading(false))
                handleClick()
            }else{
                setSeverity("success")
                setMsg("Repartidor save succesffuly")
                dispatch(actionsCreators.Loading(false))
                handleClick()
            }
        }
        catch(err : any){
            setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
        }

    }

    const formik = UseForm(initialValuesWorkers, WorkersSchema, onSubmit)
    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '30%' }}>
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

                    <Btn
                        disabled={false}
                        className=""
                        type="submit"
                        variant="contained"
                        text="Enviar"
                    />

                </Grid>
            </Grid>
            <Snackbars
                msg={msg}
                open={open}
                severity={severity}
                handleClose={handleClose}
            />
        </Box>
    )
}

*/