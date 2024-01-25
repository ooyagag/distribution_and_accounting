import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";


export const WorkersSchema: initialFValuesTypes = yup.object({
    name: yup.string().min(3, "Please enter you real name").required("Full name is required!"),
    email: yup.string().email("Please enter a valid email address").required("Full email is required!"),
})