import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";

//const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const LoginSchema: initialFValuesTypes = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Please this field is required"),
  password: yup.string().required("Please this field is required"),

})