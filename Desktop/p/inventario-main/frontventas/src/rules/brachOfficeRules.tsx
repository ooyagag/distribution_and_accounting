import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";

export const BrachOfficeSchema: initialFValuesTypes = yup.object({
    name: yup.string().min(3, "Please enter a real name").required("Name is required!")
})