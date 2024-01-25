import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";

export const SaleSchema: initialFValuesTypes = yup.object({
    returnedProduct: yup.number().required("returnedProduct is requried"),
    userId: yup.string().required("userId is requried")
})

/*
name: yup.string().min(3, "Please enter a name").required("Name is required!"),
    descriptions: yup.string().min(3, "Please enter a description").required("Description is required!"),
    price: yup.number().required("Price is requried")

*/