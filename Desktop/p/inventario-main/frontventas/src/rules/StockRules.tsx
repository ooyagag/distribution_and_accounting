import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";


export const StockSchema: initialFValuesTypes = yup.object({
    quantityOfProduct: yup.number().required("Quantity is required!"),
    productId: yup.number().required("Product is required!"),
})