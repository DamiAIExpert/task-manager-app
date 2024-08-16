import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Calendar.css';

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks', {  // Update the URL to match your backend
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
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    return new Date(year, month, 0).getDate();
  };

  const renderTasksForDay = (day) => {
    return tasks
      .filter(task => new Date(task.dueDate).getDate() === day)
      .map((task, index) => (
        <div className={`calendar-task ${task.priority}`} key={index}>
          <div className="calendar-task-avatar">
            <img src={task.avatar || 'default-avatar-url'} alt="Task Avatar" />
          </div>
          <div className="calendar-task-details">
            <p>{task.title}</p>
            <span>{task.description}</span>
          </div>
        </div>
      ));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return dayNumbers.map(day => (
      <div className="calendar-day" key={day}>
        <div className="day-number">{day}</div>
        {renderTasksForDay(day)}
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="calendar-container">
          <div className="calendar-header">
            {daysOfWeek.map((day, index) => (
              <div className="calendar-header-day" key={index}>{day}</div>
            ))}
          </div>
          <div className="calendar-body">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
