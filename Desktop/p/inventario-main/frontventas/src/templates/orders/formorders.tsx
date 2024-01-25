import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { initialValuesOrderItems } from "../../initialsValues";
import { OrderItemsSchema } from "../../rules/OrderItemsRule";
import { Btn, Input, Snackbars, Selectt } from "../../components";
import { UseForm } from "../../components/form";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { OrdersItemsRequest } from "../../services/OrdersItemsService";


import { useDispatch } from 'react-redux'
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




export function FormOrders({ open, handleClose, refresh, setrefresh, product, breach }: any) {
    const dispatch = useDispatch()
    //const storeId = useSelector((state: any) => state.AuthReducer.store);
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
            const res = await OrdersItemsRequest.OrdersItems({
                quantityOfProducts: values.quantityOfProducts,
                productsId: values.productsId,
                brachOfficesId: values.brachOfficesId
            })

            if (!res.isAuthSuccessful) {
                setSeverity("error")
                setMsg(res.errorMessage)
                dispatch(actionsCreators.Loading(false))
                console.log(res)
                handleClick()
            } else {
                setSeverity("success")
                setMsg("Orders save succesffuly")
                dispatch(actionsCreators.Loading(false))
                handleClick()
                setrefresh(!refresh)
            }
        }
        catch (err: any) {
            setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
        }


    }

    const formik = UseForm(initialValuesOrderItems, OrderItemsSchema, onSubmit)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
                    Add Orders
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                autofocus={true}
                                className="mt-3"
                                error={formik.errors.quantityOfProducts}
                                label="Quantity Of Product *"
                                name="quantityOfProducts"
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.quantityOfProducts}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Selectt
                                name="productsId"
                                value={formik.values.productsId}
                                options={product}
                                onFocus={false}
                                label="Products *"
                                onChange={formik.handleChange}
                                error={formik.errors.productsId}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Selectt
                                name="brachOfficesId"
                                value={formik.values.brachOfficesId}
                                options={breach}
                                onFocus={false}
                                label="Brach *"
                                onChange={formik.handleChange}
                                error={formik.errors.brachOfficesId}
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