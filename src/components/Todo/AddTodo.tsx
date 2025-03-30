import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const AddTodoForm = styled.form`
  display: flex;
  gap: 10px;
  margin: 20px auto;
  max-width: 600px;
  padding: 0 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        createdAt: new Date()
      });
      setTitle('');
    }
  };

  return (
    <AddTodoForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Добавить новую задачу..."
      />
      <Button type="submit" disabled={!title.trim()}>
        Добавить
      </Button>
    </AddTodoForm>
  );
}; 