import { Box, IconButton, Typography, Fab } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { useDispatch } from 'react-redux';
// import moment from 'moment';
// import { deleteTask } from '../../actions/TaskAction';
import EditTaskModal from './EditTaskModal';
import DeleteModal from './DeleteModal';

const Tasks = ({ projectId, lane, task, onDragStart }) => {
    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    // console.log(task)


    return (
        <Box sx={styles.card} className='card' key={task.id} draggable onDragStart={(e) => onDragStart(e, task)}>
            <Box sx={styles.taskTitle}>
                <Typography variant='h6'>{task.title}</Typography>
            </Box>
            {/* <p>{moment(task.createdAt).format('MMMM Do YYYY')}</p> */}
            <p>{task.description}</p>

            <Box className="buttons" sx={styles.buttons}>
                <IconButton aria-label="edit" size="large" sx={{ marginRight: '0.5rem' }} onClick={() => handleEditOpen()}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" size="large" onClick={() => handleDeleteOpen()}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            <EditTaskModal
                projectId={projectId}
                task={task}
                open={editOpen}
                handleClose={handleEditClose} />
            <DeleteModal open={deleteOpen} handleClose={handleDeleteClose} type='task' payload={task} />
        </Box >
    )
}

const styles = {
    card: {
        background: 'rgba(255,255,255,0.4)',
        padding: '0.5rem',
        borderRadius: '5px',
        margin: '0.5rem 0',
        cursor: 'grab'
    },
    taskTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #888',
        padding: '5px',
        gap: '2rem'
    },
    buttons: {
        borderTop: '1px solid #888',
        padding: "5px 0"
    }
}

export default Tasks