import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            name: yup.string().trim()
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required')
                .matches(/^[a-zA-Z '-,.]+$/,
                    "Only allow letters, spaces and characters: ' - , ."),
            email: yup.string().trim()
                .email('Enter a valid email')
                .max(50, 'Email must be at most 50 characters')
                .required('Email is required'),
            password: yup.string().trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password must be at most 50 characters')
                .required('Password is required')
                .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                    "At least 1 letter and 1 number"),
            confirmPassword: yup.string().trim()
                .required('Confirm password is required')
                .oneOf([yup.ref('password')], 'Passwords must match')
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post("/user/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography
                variant="h2"
                sx={{ my: 3, borderBottom: "3px solid orange", paddingBottom: "7px", color: 'red' }}
            >
                <strong>Register</strong>
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}>
                <TextField
                    sx={{ backgroundColor: "#fdcda9" }}
                    fullWidth margin="dense" autoComplete="off"
                    label={
                        <Typography
                            style={{
                                color: "#1a1a1a"
                            }}
                        >
                            Name
                        </Typography>
                    }
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                />
                <TextField
                    sx={{ backgroundColor: "#fdcda9" }}
                    fullWidth margin="dense" autoComplete="off"
                    label={
                        <Typography
                            style={{
                                color: "#1a1a1a"
                            }}
                        >
                            Email
                        </Typography>
                    }
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                />
                <TextField
                    sx={{ backgroundColor: "#fdcda9" }}
                    fullWidth margin="dense" autoComplete="off"
                    label={
                        <Typography
                            style={{
                                color: "#1a1a1a"
                            }}
                        >
                            Password
                        </Typography>
                    }
                    name="password" type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                />
                <TextField
                    sx={{ backgroundColor: "#fdcda9" }}
                    fullWidth margin="dense" autoComplete="off"
                    label={
                        <Typography
                            style={{
                                color: "#1a1a1a"
                            }}
                        >
                            Confirm Password
                        </Typography>
                    }
                    name="confirmPassword" type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    InputProps={{
                        style: {
                            color: "black"
                        },
                    }}
                />
                <Button fullWidth variant="contained" sx={{
                    mt: 2,
                    padding: "0.5rem 2.5rem",
                    backgroundColor: "#fe9e0d",
                    outline: "none",
                    border: "none",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "0.2s",
                }}
                    type="submit">
                    Register
                </Button>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default Register;