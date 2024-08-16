import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TasksTable.css'; // Import CSS file for styling
import { FaEdit } from 'react-icons/fa'; // Import pencil icon from react-icons

const TasksTable = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        phase: '',
    });

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Update a task
    const updateTask = async (taskId, updatedTaskData) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTaskData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks(); // Refresh tasks after update
            setIsEditing(false); // Close the edit form after updating
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks(); // Refresh tasks after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Change task status (phase)
    const changeTaskStatus = async (taskId, newPhase) => {
        const task = tasks.find(t => t._id === taskId);
        if (task) {
            await updateTask(taskId, { ...task, phase: newPhase });
        } else {
            console.error('Task not found');
        }
    };

    // Open edit form with current task details
    const openEditForm = (task) => {
        setCurrentTask(task);
        setIsEditing(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask(prevTask => ({
            ...prevTask,
            [name]: value,
        }));
    };

    // Handle form submission to update the task
    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask(currentTask._id, currentTask);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="tasks-table-container">
            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Assignee</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.user?.name || 'Unassigned'}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.priority || 'N/A'}</td>
                            <td>{task.phase}</td>
                            <td>
                                <button onClick={() => changeTaskStatus(task._id, 'In-progress')}>In-progress</button>
                                <button onClick={() => changeTaskStatus(task._id, 'In-review')}>In-review</button>
                                <button onClick={() => changeTaskStatus(task._id, 'Done')}>Done</button>
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                                <button onClick={() => openEditForm(task)}>
                                    <FaEdit /> {/* Pencil icon */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div className="edit-task-form-container">
                    <h3>Edit Task</h3>
                    <form className="edit-task-form" onSubmit={handleFormSubmit}>
                        <label>
                            Task Title
                            <input
                                type="text"
                                name="title"
                                value={currentTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Description
                            <textarea
                                name="description"
                                value={currentTask.description}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Due Date
                            <input
                                type="date"
                                name="dueDate"
                                value={new Date(currentTask.dueDate).toISOString().substr(0, 10)}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Phase
                            <select
                                name="phase"
                                value={currentTask.phase}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Todo">Todo</option>
                                <option value="In-progress">In-progress</option>
                                <option value="In-review">In-review</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                        <div className="edit-task-form-buttons">
                            <button type="submit">Update Task</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TasksTable;
