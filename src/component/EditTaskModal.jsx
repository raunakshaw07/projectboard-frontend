import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Modal, Box, Typography, TextField, MenuItem, FormControl, InputLabel, Alert } from '@mui/material'
import Select from '@mui/material/Select';
import axios from 'axios'

import { updateTaskRoute } from '../utils/APIRoutes';

const CssTextField = styled(TextField)({
    '& .MuiInputBase-root': {
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

const CustomFormControl = styled(FormControl)({
    '& .MuiInputBase-root': {
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

const EditTaskModal = ({ open, handleClose, task }) => {
    const [values, setValues] = useState({ lane: task.lane, title: task.title, description: task.description });
    const [alert, setAlert] = useState({ type: null, msg: null });

    const handleChange = (event) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
        if (values.lane.trim() === '' || values.title.trim() === '' || values.description.trim() === '')
            return false
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidation()) {
            const { data } = await axios.post(`${updateTaskRoute}/${task._id}`, values);
            if (data.status) {
                setValues({ lane: task.lane, title: task.title, description: task.description });
                handleClose();
            } else {
                setAlert({ type: 'error', msg: data.msg });
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.box}>
                    <Typography variant='h4' component='h4' sx={style.cardHead}>Edit Task</Typography>
                    <hr width-='90%' />
                    <form style={style.form} onSubmit={handleSubmit}>
                        {alert.type !== null ?
                            <Alert sx={{ width: '100%', margin: '1rem 0' }} severity={alert.type}>{alert.msg}</Alert> : null}
                        <CustomFormControl required fullWidth>
                            <InputLabel>Lane</InputLabel>
                            <Select
                                value={values.lane}
                                label="Lane"
                                name='lane'
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value='To Do'>To Do</MenuItem>
                                <MenuItem value='In Progress'>In Progress</MenuItem>
                                <MenuItem value='Review'>Review</MenuItem>
                                <MenuItem value='Completed'>Completed</MenuItem>
                            </Select>
                        </CustomFormControl>

                        <CssTextField
                            fullWidth
                            type='text'
                            required
                            label="Title"
                            name='title'
                            sx={{ color: '#eee' }}
                            value={values.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <CssTextField
                            fullWidth
                            label="Description of the project"
                            type="text"
                            name="description"
                            required
                            multiline
                            rows={4}
                            value={values.description}
                            onChange={(e) => handleChange(e)}
                        />
                        <SubmitButton type='submit' size='large' variant="contained">Save Changes</SubmitButton>
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
        // alignItems: 'center',
        color: '#fff',
        marginTop: '2rem'
    }
};

export default EditTaskModal