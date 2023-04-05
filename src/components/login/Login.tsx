import { useState } from "react";
import api from '../../api/base'
import { useNavigate } from "react-router-dom";
import {
    Formik,
    Form,
} from "formik";
import CustomInput from "../form-templates/CustomInput";
import { IUserLogin, IUser, LoginData } from "../../interfaces/UserInterfaces";


const Login = () => {
    const navigate = useNavigate()
    const initialValues: IUserLogin = { email: '', password: '' }

    const onSubmit = async (values: IUserLogin, actions: { resetForm: () => void; }) => {
        console.log(values);

        try {
            const { data } = await api.post<LoginData>('/perpustakaan/api/v1/user/login', {
                email: values.email,
                password: values.password
            })
            localStorage.setItem('username', data.data.username)
            localStorage.setItem('user_id', data.data.user_id)
            console.log(data);
            navigate('/book')

        } catch (error) {
            if (error instanceof Error) {
                // ✅ TypeScript knows error is Error
                alert(error.message);
            } else {
                console.log('Unexpected error', error);
            }
        } finally {
            actions.resetForm()
        }
    }
    return (
        <div className="login">
            <h2> Login</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="loginForm">
                        <CustomInput label='Email' name='email' type='text' placeholder="Enter your email" />

                        <CustomInput label='Password' name='password' type='password' placeholder="Enter your password" />

                        <button disabled={isSubmitting} type="submit"> Submit </button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default Login