import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useAppContext } from '../../context/AppContext';

const TodoListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;

export const TodoList: React.FC = () => {
  const { tasks } = useAppContext();

  if (tasks.length === 0) {
    return <EmptyMessage>Нет задач</EmptyMessage>;
  }

  return (
    <TodoListContainer>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </TodoListContainer>
  );
}; 