import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error('Failed to fetch task:', err);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await taskService.updateTask(id, task);
      alert('Task updated successfully!');
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(id);
      alert('Task deleted successfully!');
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="isCompleted"
              checked={task.isCompleted}
              onChange={() =>
                setTask({ ...task, isCompleted: !task.isCompleted })
              }
            />
            Completed
          </label>
        </div>
        <button type="submit">Update Task</button>
        <button type="button" onClick={handleDelete}>
          Delete Task
        </button>
      </form>
    </div>
  );
}

export default TaskDetail;
