import React, { useState, useEffect, useCallback } from 'react';
import TaskItem from '../components/TaskItem';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/TaskManager.css';
import '../styles/AddTask.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    phase: 'Todo',
  });

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setNewTask({ title: '', description: '', dueDate: '', phase: 'Todo' });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const filterTasks = (phase) => tasks.filter(task => task.phase === phase);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="task-layout">
          <div className="task-manager">
            <div className="task-phase">
              <h3>Todo</h3>
              {filterTasks('Todo').map(task => <TaskItem key={task.id} task={task} />)}
            </div>
            <div className="task-phase">
              <h3>In-progress</h3>
              {filterTasks('In-progress').map(task => <TaskItem key={task.id} task={task} />)}
            </div>
            <div className="task-phase">
              <h3>In-review</h3>
              {filterTasks('In-review').map(task => <TaskItem key={task.id} task={task} />)}
            </div>
            <div className="task-phase">
              <h3>Done</h3>
              {filterTasks('Done').map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
