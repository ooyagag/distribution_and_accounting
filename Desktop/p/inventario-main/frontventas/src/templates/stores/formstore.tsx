import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { initialValuesBrachOffice } from "../../initialsValues";
import { BrachOfficeSchema } from "../../rules/brachOfficeRules";
import { Btn, Input, Snackbars } from "../../components";
import { UseForm } from "../../components/form";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { brachRequest } from "../../services/BrachOfficeService";


import { useDispatch, useSelector } from 'react-redux'
import * as actionsCreators from "../../store/actions/auth.actions";
import React from 'react';
import { setFormikErrors } from "../../helper";



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export function FormStore({open, handleClose, refresh, setrefresh} : any)
{
    const dispatch = useDispatch()
    const storeId = useSelector((state: any) => state.AuthReducer.store);
    const [openn, setOpenn] = React.useState(false);
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    
    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    const handleClick = () => {
        setOpenn(true);
    };

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {

        dispatch(actionsCreators.Loading(true))
        try {
            const res = await brachRequest.brach({
                name: values.name,
                storeId: storeId
            })

            if (!res.isAuthSuccessful) {
                setSeverity("error")
                setMsg(res.errorMessage)
                dispatch(actionsCreators.Loading(false))
                handleClick()
            } else {
                setSeverity("success")
                setMsg("Store save succesffuly")
                dispatch(actionsCreators.Loading(false))
                handleClick()
                setrefresh(!refresh)
            }
        }
        catch (err: any) {
            setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
        }


    }

    const formik = UseForm(initialValuesBrachOffice, BrachOfficeSchema, onSubmit)

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
                Add Store
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

                        <Btn
                            disabled={false}
                            className=""
                            type="submit"
                            variant="contained"
                            text="Enviar"
                        />

                    </Grid>
                </Grid>
               



            </Box>
        </Modal>
        <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />
        </div>
    )
}