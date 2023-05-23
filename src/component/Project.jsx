import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles'
import axios from 'axios';
import moment from 'moment'

import Board from './Board';
import EditProjectModal from './EditProjectModal';
import DeleteModal from './DeleteModal';
import { singleProjectRoute } from '../utils/APIRoutes';

const EditButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FBAE3C"),
    backgroundColor: '#FBAE3C',
    color: 'white',
    '&:hover': {
        backgroundColor: "#d68918",
    },
}));

const Project = () => {
    const param = useParams();

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [project, setProject] = useState(null);

    const id = param.id;
    const getProject = async () => {
        const { data } = await axios.get(`${singleProjectRoute}/${id}`);
        setProject(data.data)
    }
    getProject()


    // const project = {
    //     userId: "sadadsa",
    //     title: "Project 1",
    //     desc: "lorem ipsum",
    //     lanes: [
    //         {
    //             id: 1,
    //             title: "To Do",
    //             projectId: "",
    //             tasks: []
    //         },
    //         {
    //             id: 2,
    //             title: "In Progress",
    //             projectId: "",
    //             tasks: []
    //         },
    //         {
    //             id: 3,
    //             title: "Review",
    //             projectId: "",
    //             tasks: []
    //         },
    //         {
    //             id: 4,
    //             title: "Completed",
    //             projectId: "",
    //             tasks: []
    //         }
    //     ]
    // }
    if (project !== null) {
        return (
            <div>
                <Navbar />
                <Box sx={{ color: 'white', margin: '0 auto' }}>
                    <Box sx={styles.info}>
                        <Link to='/' style={{ color: '#FBAE3C', display: 'flex', alignItems: 'center' }}>
                            <ArrowBackIcon sx={{ marginRight: '0.5rem' }} />
                            Go To Dashboard
                        </Link>
                        <Box sx={styles.title}>
                            <Typography variant='h2'>{project.title}</Typography>
                            <Box>
                                <EditButton
                                    variant='contained'
                                    onClick={() => handleOpenEdit()}
                                    sx={{ marginRight: '1rem', background: '#FBAE3C' }}
                                >
                                    Edit
                                </EditButton>
                                <Button variant='contained' color='error' onClick={() => handleOpenDelete()}>Delete</Button>
                            </Box>
                        </Box>
                        <Typography>{moment(project.createdAt).format('MMMM DD, YYYY')}</Typography>
                        <Typography sx={{ margin: '2rem 0' }}>
                            {project.description}
                        </Typography>
                    </Box>

                    <Box sx={styles.kanban}>
                        <Board project={project} />
                    </Box>
                </Box>


                <EditProjectModal open={openEdit} handleClose={handleCloseEdit} project={project} />
                <DeleteModal open={openDelete} handleClose={handleCloseDelete} type='project' payload={project} />
            </div >
        )
    } else {
        return <h1>Loading...</h1>
    }
}

const styles = {
    info: {
        margin: '2rem 10%'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2rem 0'
    },
    kanban: {
        width: '80%',
        overflow: 'auto',
        margin: '2rem auto',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.3)'
    }
}

export default Project