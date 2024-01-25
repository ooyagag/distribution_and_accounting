import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { Btn, Input, Snackbars, Selectt } from "../../components";
import { UseForm } from "../../components/form";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { initialValuesSale } from "../../initialsValues";
import { SaleSchema } from "../../rules/saleRule";
import { saleRequest } from "../../services/saleService";


import { useDispatch } from 'react-redux'
import * as actionsCreators from "../../store/actions/auth.actions";


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


export function OrdersModal({ open, handleClose, refresh, setrefresh, data, Users }: any) {
    
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

        //console.log("d",data)
        //console.log("v",values)

        if(values.returnedProduct > data.qualityOfProducts)
        {
            formikHelpers.setFieldError("returnedProduct","you don't have that many products");
        }else{
            dispatch(actionsCreators.Loading(true))
            const res = await saleRequest.sale({
                returnedProducts : values.returnedProduct,
                userId : values.userId,
                orderItemsId : data.id
            })

            if (!res.isAuthSuccessful) {
                setSeverity("error")
                setMsg(res.errorMessage)
                dispatch(actionsCreators.Loading(false))
                console.log(res)
                handleClick()
            } else {
                setSeverity("success")
                setMsg("Sale save succesffuly")
                dispatch(actionsCreators.Loading(false))
                handleClick()
                setrefresh(!refresh)
            }
        }
        /*try {
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
        }*/


    }

    const formik = UseForm(initialValuesSale, SaleSchema, onSubmit)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
                    Add Sale

                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <Input
                                autofocus={true}
                                className="mt-3"
                                error={formik.errors.returnedProduct}
                                label="returned Product *"
                                name="returnedProduct"
                                onChange={formik.handleChange}
                                type="number"
                                value={formik.values.returnedProduct}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Selectt
                                name="userId"
                                value={formik.values.userId}
                                options={Users}
                                onFocus={false}
                                label="Products *"
                                onChange={formik.handleChange}
                                error={formik.errors.userId}
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