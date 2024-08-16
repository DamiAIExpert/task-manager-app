import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'; 

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          // Add class to specific dates
          if (date.getDate() === 16) {
            return 'highlighted-tile';
          }
          return null;
        }}
      />
    </div>
  );
};

export default CustomCalendar;
