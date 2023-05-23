import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Modal, Box, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { deleteProjectRoute, deleteTaskRoute } from '../utils/APIRoutes'

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#002233"),
    backgroundColor: '#01334d',
    '&:hover': {
        backgroundColor: "#002233",
    },
}));

const DeleteProjectModal = ({ open, handleClose, type, payload }) => {
    const [alert, setAlert] = useState({ type: null, msg: null });
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const route = type === 'project' ? deleteProjectRoute : deleteTaskRoute;
        const { data } = await axios.get(`${route}/${payload._id}`)
        if (data.status && type === 'project') {
            navigate('/');
        } else {
            setAlert({ type: 'error', msg: data.msg });
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
                    <Typography variant='h4' component='h4' sx={style.cardHead}>Delete {type}</Typography>
                    <hr width-='90%' />
                    {alert.type !== null ?
                        <Alert sx={{ width: '100%', margin: '1rem 0' }} severity={alert.type}>{alert.msg}</Alert> : null}
                    <Typography>Are you sure you want to delete this {type}?</Typography>
                    <Box sx={style.buttons}>
                        <Button
                            sx={{ background: '#666' }}
                            type='submit'
                            size='large'
                            variant="contained"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <CustomButton
                            type='submit'
                            size='large'
                            variant="contained"
                            onClick={(e) => handleClick(e)}
                        >
                            Delete
                        </CustomButton>
                    </Box>
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
        outline: 'none',
    },
    cardHead: {
        textAlign: 'center',
        marginBottom: '1rem',
        fontWeight: '500',
        minWidth: '25rem',
    },
    form: {
        height: '70%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        marginTop: '2rem'
    },
    buttons: {
        width: '60%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2rem 0 0 0'
    }
};

export default DeleteProjectModal