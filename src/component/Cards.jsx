import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { Typography, Card, CardContent, CardActions, Button } from '@mui/material'

const Cards = ({ project }) => {
    const navigate = useNavigate();

    const truncate = (str) => {
        if (str.length > 80 && str.length > 0) {
            let new_str = str + "";
            new_str = str.substr(0, 80);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = new_str.length > 0 ? new_str : str.substr(0, 80);
            return new_str + "...";
        }
        return str;
    }

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {project.title}
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                    {moment(project.createdAt).format('MMMM DD, YYYY')}
                </Typography>
                <Typography variant="body2">
                    {truncate(project.description)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/project/${project._id}`)}>Show More</Button>
            </CardActions>
        </Card>
    )
}

const cardStyle = {
    maxWidth: 275,
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '10px',
    // margin: '0 auto'
}

export default Cards