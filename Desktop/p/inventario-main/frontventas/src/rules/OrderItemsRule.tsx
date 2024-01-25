import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";

export const OrderItemsSchema: initialFValuesTypes = yup.object({
    quantityOfProducts: yup.number().required("QuantityOfProducts is required!"),
    productsId: yup.number().required("ProductsId is required!"),
    brachOfficesId: yup.number().required("brachOfficeId is required!")
})