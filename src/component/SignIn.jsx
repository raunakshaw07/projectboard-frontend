import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, TextField, Alert, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const CssTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: '#ccc',
    },
    '& label.Mui-focused': {
        color: '#ccc',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#ddd',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ccc',
            color: '#fff'
        },
        '&:hover fieldset': {
            borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ccc',
        },
    },
});

const SubmitButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#002233"),
    backgroundColor: '#01334d',
    '&:hover': {
        backgroundColor: "#002233",
    },
}));

const SignIn = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({ email: "", password: "" });
    const [alert, setAlert] = useState({ type: null, msg: null });


    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [navigate]);


    const handleChange = (event) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleValidation = () => {
        const { email, password } = values;
        if (email === '' || password === '') {
            setAlert({ type: 'error', msg: 'Both email and password required' });
            return false;
        }
        return true
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setAlert({ type: 'warning', msg: "Please wait while we log you in..." });
        if (handleValidation()) {
            const { email, password } = values;
            const { data } = await axios.post(loginRoute, {
                email,
                password,
            });

            if (data.status === false) {
                setAlert({ type: 'error', msg: data.msg });
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );

                navigate("/");
            }
        }
    }

    return (
        <div className='common'>
            <CssBaseline />
            <div style={style.logo}>
                <Typography sx={style.heading}>ProjectBoard</Typography>
            </div>
            <Container maxWidth="sm" sx={style.container} className='container'>
                <Box sx={style.box}>
                    <Typography variant='h4' component='h4' sx={style.cardHead}>Welcome to ProjectBoard</Typography>
                    <Typography sx={{ color: '#ccc' }}>Please sign in and start the adventure</Typography>
                    <form style={style.form} onSubmit={onSubmitHandler}>
                        {alert.type !== null ? <Alert sx={{ width: '100%', margin: '1rem 0' }} severity={alert.type}>{alert.msg}</Alert> : null}
                        <CssTextField
                            fullWidth
                            type='text'
                            required
                            label="Email"
                            name='email'
                            sx={{ color: '#eee' }}
                            value={values.email}
                            onChange={(e) => handleChange(e)} />
                        <CssTextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            required
                            value={values.password}
                            onChange={(e) => handleChange(e)}
                        />
                        <SubmitButton type='submit' size='large' variant="contained">Sign In</SubmitButton>
                    </form>
                    <Typography sx={{ color: '#ccc' }}>Don't have an account? <Link to='/signup' style={{ color: '#fff' }}>Sign Up Here</Link></Typography>
                </Box>
            </Container>

        </div>
    )
}

const style = {
    logo: {
        height: '10vh',
    },
    heading: {
        color: '#ddd',
        padding: '1rem',
        fontSize: '1.5rem'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
    },
    box: {
        minHeight: '70vh',
        minWidth: '35rem',
        height: 'fit-content',
        width: 'fit-content',
        background: 'rgba(232, 232, 232, 0.4)',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '3rem'
    },
    cardHead: { textAlign: 'center', marginBottom: '1rem', color: '#eee', fontWeight: '500' },
    form: {
        height: '70%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        color: '#fff'
    }
}

export default SignIn