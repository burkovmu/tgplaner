import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Task } from '../../types';

interface TodoItemProps {
  task: Task;
}

const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const { dispatch } = useAppContext();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', id: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', id: task.id });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span>{task.title}</span>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default TodoItem; 