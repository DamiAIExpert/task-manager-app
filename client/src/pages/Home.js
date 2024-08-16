import React, { useEffect, useState } from 'react';
import taskService from '../services/taskService';
import TaskItem from '../components/TaskItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    taskService.getTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load tasks');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
}

export default Home;
