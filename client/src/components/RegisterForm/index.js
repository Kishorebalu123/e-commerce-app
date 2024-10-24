import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username Required'),
    password: Yup.string().min(4, 'Password Too Short').required('Password Required'),
});

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showErrMsg,setShowErrMsg]=useState(false)
    const [msg,setMsg]=useState('')
    const navigate = useNavigate();

    const submitSuccess = (msg) => {
        setMsg(msg)
        setShowErrMsg(true)
       
        setTimeout(() => {
            setShowErrMsg(false);
            navigate('/login', { replace: true });
          }, 2000); 
    };

    const submitFailure = (msg) => {
        setMsg(msg)
        setShowErrMsg(true)
    };

    const handleSubmit = async (values) => {
        try {
            const { username, password } = values;
            const url = 'http://localhost:5000/api/auth/register';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                submitSuccess(data.message);
            } else {
                submitFailure(data.msg);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="register-main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            className="login-image"
            alt="website login"
          />
            <div className="form-container">

                 <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo"
            alt="website logo"
          />
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="styled-form">
                            <Field name="username" placeholder="Username" className="styled-field" />
                            {errors.username && touched.username ? (
                                <div className="error-message">{errors.username}</div>
                            ) : null}

                            <div className="password-wrapper">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="styled-field"
                                />
                                <span
                                    className="password-toggle-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                                {errors.password && touched.password ? (
                                    <div className="error-message">{errors.password}</div>
                                ) : null}
                            </div>
                            {showErrMsg&&<p className='error-message'>{msg}</p>}
                            <button type="submit" className="submit-button">Register</button>
                        </Form>
                    )}
                </Formik>

                <div>
                Already have an account? <Link to="/login">Login here</Link>
            </div>
            </div>
          
        </div>
    );
};

export default RegisterForm;
