import { Field, FieldHookConfig, useField } from "formik";
import { ReactNode } from "react";

type CustomInputProps ={
    label: string
} & FieldHookConfig<any>

const CustomInput = ({ label, ...props }: CustomInputProps) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label>{label}</label>
            <Field {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""} />

            {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
        </>
    )
}

export default CustomInput