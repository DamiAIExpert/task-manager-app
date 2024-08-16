import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="task-item">
      <div className="task-item-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-progress">
          <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
        </div>
      </div>
      <div className="task-avatars">
        {task.avatars && task.avatars.length > 0 ? (
          task.avatars.map((avatar, index) => (
            <img key={index} src={avatar} alt={`Avatar ${index + 1}`} />
          ))
        ) : (
          <p>No Avatars</p> 
        )}
      </div>
    </div>
  );
};

export default TaskItem;
