import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Card, CardContent, CardActions } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { allProjectRoute } from '../utils/APIRoutes';

import Cards from './Cards'
import Navbar from './Navbar';
import CreateProjectModal from './CreateProjectModal';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/signin");
        } else {
            setCurrentUser(
                JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )
            );
        }
    }, [navigate]);

    const AllProjects = async () => {
        if (currentUser != null) {
            const userId = currentUser.id;
            const { data } = await axios.post(allProjectRoute, { id: userId });
            setProjects(data.data);
        }
    }

    AllProjects();

    if (currentUser !== null) {
        return (
            <Box className='dashboard'>
                <Navbar />
                <Container maxWidth='lg' sx={styles.container}>
                    <Box sx={styles.hero}>
                        <Typography
                            variant='h3'
                            sx={{ color: '#eee', textShadow: '3px 3px 5px rgba(0, 0, 0, 1)', marginBottom: '1rem' }}
                        >
                            Dashboard
                        </Typography>
                        <Typography
                            variant='h2'
                            sx={{ fontWeight: '500', color: '#fff', textShadow: '3px 3px 5px rgba(0, 0, 0, 1)', marginBottom: '1rem' }}
                        >
                            Welcome, {currentUser.name}
                        </Typography>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: '500', color: '#eee', textShadow: '3px 3px 5px rgba(0, 0, 0, 1)' }}
                        >
                            {currentUser.email}
                        </Typography>
                    </Box>
                    <Typography variant='h3' sx={{ marginTop: '2rem 0', color: '#eee' }}>Your Projects</Typography>
                    <hr width='100%' />
                    <Box className='projects' sx={styles.projects}>
                        {/* Create Project card */}
                        <Card sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                    Create New Project
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box sx={styles.createButton} onClick={handleOpen}>
                                    <AddIcon />
                                </Box>
                            </CardActions>
                        </Card>

                        {/* All Projects */}
                        {projects.length !== 0 && projects.map(project => (
                            <Cards project={project} key={project._id} />
                        ))}
                    </Box>
                </Container>
                <Box className="overlay"></Box>

                <CreateProjectModal open={open} handleClose={handleClose} currentUser={currentUser} />
            </Box>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    hero: {
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    projects: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        margin: '2rem 0'
    },
    card: {
        width: '275px',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButton: {
        height: '40px',
        width: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#002233',
        color: '#fff',
        padding: '0.5rem',
        borderRadius: '50%',
        cursor: 'pointer'
    }
}

export default Dashboard