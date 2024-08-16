import React, { useState, useEffect, useCallback } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskManager.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filterTasks = (phase) => tasks.filter(task => task.phase === phase);

  return (
    <div className="task-manager">
      <div className="task-phase">
        <h3>Todo</h3>
        {filterTasks('Todo').map(task => <TaskItem key={task._id} task={task} />)}
      </div>
      <div className="task-phase">
        <h3>In-progress</h3>
        {filterTasks('In-progress').map(task => <TaskItem key={task._id} task={task} />)}
      </div>
      <div className="task-phase">
        <h3>In-review</h3>
        {filterTasks('In-review').map(task => <TaskItem key={task._id} task={task} />)}
      </div>
      <div className="task-phase">
        <h3>Done</h3>
        {filterTasks('Done').map(task => <TaskItem key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskList;
