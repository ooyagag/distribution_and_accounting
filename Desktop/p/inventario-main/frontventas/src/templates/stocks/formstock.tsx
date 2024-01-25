import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { initialValuesStock } from "../../initialsValues";
import { StockSchema } from "../../rules/StockRules";
import { Btn, Input, Snackbars, Selectt } from "../../components";
import { UseForm } from "../../components/form";
import { initialFValuesTypes } from "../../types/typesForms";
import { FormikHelpers } from "formik";
import { StockRequest } from "../../services/stockServices";


import { useDispatch /*, useSelector*/ } from 'react-redux'
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


export function FormStock({open, handleClose, refresh, setrefresh, products} : any)
{
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
        console.log(values)
        try {
            const res = await StockRequest.Stock({
                quantityOfProduct: values.quantityOfProduct,
                productId: values.productId
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

    const formik = UseForm(initialValuesStock, StockSchema, onSubmit)

    return (
        <div>
             <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
                Add Stock
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            autofocus={true}
                            className="mt-3"
                            error={formik.errors.quantityOfProduct}
                            label="Quantity Of Product *"
                            name="quantityOfProduct"
                            onChange={formik.handleChange}
                            type="number"
                            value={formik.values.quantityOfProduct}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Selectt
                         name="productId"
                         value={formik.values.productId}
                         options={products}
                         onFocus={false}
                         label="Products *"
                         onChange={formik.handleChange}
                         error={formik.errors.productId}
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