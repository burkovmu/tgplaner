import React from 'react';
import styled from 'styled-components';
import { AppProvider } from './context/AppContext';
import { AddTodo } from './components/Todo/AddTodo';
import { TodoList } from './components/Todo/TodoList';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContainer>
        <Title>Список задач</Title>
        <AddTodo />
        <TodoList />
      </AppContainer>
    </AppProvider>
  );
};

export default App;
