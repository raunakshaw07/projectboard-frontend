import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    return (
        <Box sx={styles.nav}>
            <Link to='/' style={{ color: '#002233' }}>
                <Typography variant='h6'>ProjectBoard</Typography>
            </Link>
            <IconButton aria-label="Logout" size="small" sx={styles.button}>
                <LogoutIcon fontSize="inherit" sx={{ marginRight: '0.3rem' }} /> Logout
            </IconButton>
        </Box>
    )
}

const styles = {
    nav: {
        margin: '0 auto',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
        color: '#ffffff',
        background: '#FBAE3C',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 'drawer',
    },
    button: {
        fontSize: '1rem',
        color: '#002233',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '99px',
        padding: '0.7rem 1rem'
    },
}

export default Navbar