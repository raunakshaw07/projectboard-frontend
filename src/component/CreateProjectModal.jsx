import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Modal, Box, Typography, TextField, Alert } from '@mui/material'
import axios from 'axios'
import { createProjectRoute } from '../utils/APIRoutes'

const CssTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        // color: 'white',
        margin: '1rem 0'
    },
    '& .MuiInputLabel-root': {
        color: '#002233',
        margin: '1rem 0'
    },
    '& label.Mui-focused': {
        color: '#002233',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#ddd',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#002233',
            color: '#fff'
        },
        '&:hover fieldset': {
            borderColor: '#002233',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#002233',
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

const CreateProjectModal = ({ open, handleClose, currentUser }) => {
    const [values, setValues] = useState({ title: '', desc: '' });
    const [alert, setAlert] = useState({ type: null, msg: null });

    const handleChange = (event) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        if (values.title.trim() === '' || values.desc.trim() === '')
            return false
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const newProject = {
                userId: currentUser.id,
                title: values.title,
                desc: values.desc,
                lanes: [
                    { title: "To Do" },
                    { title: "In Progress" },
                    { title: "Review" },
                    { title: "Completed" }
                ]
            }
            const { data } = await axios.post(createProjectRoute, newProject);
            if (!data.status) {
                setAlert({ type: 'error', msg: data.msg });
            } else {
                setValues({ title: '', desc: '' });
                handleClose()
            }
        } else {
            setAlert({ type: 'error', msg: 'Please fill all the fields' });
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style.box}>
                    <Typography variant='h4' component='h4' sx={style.cardHead}>Create New Project</Typography>
                    <hr width-='90%' />
                    <form style={style.form} onSubmit={handleSubmit}>
                        {alert.type !== null ? <Alert sx={{ width: '100%', margin: '1rem 0' }} severity={alert.type}>{alert.msg}</Alert> : null}
                        <CssTextField
                            fullWidth
                            type='text'
                            required
                            label="Title of project"
                            name='title'
                            sx={{ color: '#eee' }}
                            value={values.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <CssTextField
                            fullWidth
                            label="Description of the project"
                            type="text"
                            name="desc"
                            required
                            multiline
                            rows={4}
                            value={values.desc}
                            onChange={(e) => handleChange(e)}
                        />
                        <SubmitButton type='submit' size='large' variant="contained">Create</SubmitButton>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

const style = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        height: 'fit-content',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 6,
        borderRadius: '10px',
        outline: 'none'
    },
    cardHead: { textAlign: 'center', marginBottom: '1rem', fontWeight: '500', minWidth: '25rem' },
    form: {
        height: '70%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        color: '#fff',
        marginTop: '2rem'
    }
};

export default CreateProjectModal