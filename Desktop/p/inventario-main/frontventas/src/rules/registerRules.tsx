import { initialFValuesTypes } from "../types/typesForms";
import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const RegisterSchema: initialFValuesTypes = yup.object({
    name: yup.string().min(3, "Please enter your real name").required("Full name is required!"),
    email: yup.string().email("Please enter a valid email address").required("Full email is required!"),
    storename: yup.string().min(3, "Please enter real store's name").required("store's name is required!"),
    password: yup.string().matches(PASSWORD_REGEX, "Please enter a strong password").required(),
    confirmpassword: yup.string().required("Please confirm your password")
        .when("password", {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref("password")], "Password does not match"),
        })
    
})