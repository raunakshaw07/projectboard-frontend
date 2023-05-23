import React, { useState, useEffect } from 'react'
import Lane from './Lane'
import { Box } from '@mui/material'
import CreateTaskModal from './CreateTaskModal'
import axios from 'axios'

import { allTaskRoute, updateProjectRoute, updateTaskRoute } from '../utils/APIRoutes'

const Board = ({ project }) => {
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState(null);

    const allTasks = async () => {
        const projectId = project._id;
        const { data } = await axios.post(allTaskRoute, { id: projectId });
        setTasks(data.data);
    }

    allTasks();

    const handleCreateOpen = () => setAddTaskOpen(true);
    const handleCreateClose = () => setAddTaskOpen(false);

    const onDrop = async (e, lane) => {
        const id = selectedTask._id;
        const task = tasks.filter(task => task._id.toString() === id)[0];
        task.lane = lane.title;
        await axios.post(`${updateTaskRoute}/${task._id}`, task)
    }

    const onDragStart = (event, task) => {
        setSelectedTask(task);
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    if (tasks) {
        return (
            <Box className='board' sx={styles.board}>
                <CreateTaskModal
                    open={addTaskOpen}
                    handleClose={handleCreateClose}
                    projectId={project._id}
                />
                {
                    project.lanes ? project.lanes.map(lane => {
                        return (
                            <Lane
                                projectId={project._id}
                                key={lane._id}
                                lane={lane}
                                onDragStart={onDragStart}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                tasks={tasks.filter((task) => task.lane === lane.title)}
                                handleOpen={handleCreateOpen}
                            />
                        )
                    }) : <p>Loading...</p>
                }
            </Box>
        )
    } else {
        return <p>Loading...</p>
    }
}

const styles = {
    board: {
        display: 'flex',
        // margin: '2rem auto',
        padding: '1.5rem',
        borderRadius: '10px',
        display: 'flex',
        gap: '2rem',
        minHeight: '40vh',
        width: '1170px',
        overflow: 'auto'
    }
}

export default Board