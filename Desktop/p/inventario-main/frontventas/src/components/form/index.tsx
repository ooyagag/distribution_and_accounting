import { useFormik } from "formik";
import { formPropstypes, initialFValuesTypes } from "../../types/typesForms";

export function UseForm(initialFValues :initialFValuesTypes, validationSchema : initialFValuesTypes, onsubmit : any){
    
    const formik = useFormik({
        initialValues : initialFValues,
        validateOnBlur : true,
        onSubmit : onsubmit,
        validationSchema : validationSchema
    })


    return formik
}

export function Form(props : formPropstypes){
    const { className, children, onSubmit} = props

    return(
        <form className={className} onSubmit={onSubmit}>
            { children }
        </form>
    )
}