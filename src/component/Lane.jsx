import React from 'react'

import Tasks from './Tasks'
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'

const TaskButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#002233"),
    backgroundColor: '#01334d',
    '&:hover': {
        backgroundColor: "#002233",
    },
}));

const Lane = ({ projectId, lane, tasks, onDragStart, onDragOver, onDrop, handleOpen }) => {
    return (
        <Box className='lane' sx={styles.lane} onDragOver={onDragOver} onDrop={(e) => onDrop(e, lane)}>
            <Box className="title" sx={styles.title}>
                <Typography>{lane.title}</Typography>
            </Box>
            <Box className="body" sx={styles.body}>
                {tasks && tasks.map(task => {
                    return (
                        <Tasks
                            task={task}
                            key={task._id}
                            onDragStart={onDragStart}
                            lane={lane}
                            projectId={projectId}
                        />
                    );
                })}
            </Box>
            <TaskButton variant='contained' fullWidth onClick={() => {
                handleOpen()
            }}>
                <i className="fa-solid fa-circle-plus"></i> Add Task
            </TaskButton>
        </Box>
    )
}

const styles = {
    lane: {
        height: '',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    body: {
        minHeight: '2rem',
    },
    title: {
        padding: '0.5rem',
        background: '#FBAE3C',
        borderRadius: '5px 5px 0 0',
    }
}

export default Lane