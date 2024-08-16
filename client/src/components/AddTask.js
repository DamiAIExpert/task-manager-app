import React, { useState } from 'react';
import '../styles/AddTask.css';

const AddTask = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    phase: 'Todo',
  });

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask({ title: '', description: '', dueDate: '', phase: 'Todo' });
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  return (
    <div className="add-task">
      <h3>Add New Task</h3>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <label>
          Task Title
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Time
          <div className="time-input">
            <input type="time" name="startTime" value={newTask.startTime} onChange={handleInputChange} placeholder="Start time" />
            <input type="time" name="endTime" value={newTask.endTime} onChange={handleInputChange} placeholder="End time" />
          </div>
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Add description"
            required
          />
        </label>
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default AddTask;
