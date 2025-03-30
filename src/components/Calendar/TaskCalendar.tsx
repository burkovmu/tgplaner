import React, { useState } from 'react';
import { startOfMonth, endOfMonth, subMonths, addMonths, isSameDay, format } from 'date-fns';
import { useAppContext } from '../../context/AppContext';
import styled from 'styled-components';
import { Task } from '../../types';

const CalendarContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007AFF;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const Day = styled.div<{ isToday: boolean }>`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 80px;
  background-color: ${props => props.isToday ? '#f0f9ff' : 'white'};
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TaskCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks } = useAppContext();
  
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const getTasksForDay = (day: Date): Task[] => {
    return tasks.filter(task => isSameDay(new Date(task.date), day));
  };

  const renderCalendar = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= endDate.getDate(); i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayTasks = getTasksForDay(day);
      
      days.push(
        <Day key={i} isToday={isSameDay(day, today)}>
          <div>{i}</div>
          {dayTasks.map(task => (
            <div key={task.id} style={{ 
              padding: '4px',
              margin: '2px 0',
              backgroundColor: task.completed ? '#e8f5e9' : '#fff3e0',
              borderRadius: '2px',
              fontSize: '12px'
            }}>
              {task.title}
            </div>
          ))}
        </Day>
      );
    }
    
    return days;
  };

  return (
    <CalendarContainer>
      <Header>
        <Button onClick={handlePrevMonth}>&lt; Предыдущий</Button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <Button onClick={handleNextMonth}>Следующий &gt;</Button>
      </Header>
      <Calendar>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>{day}</div>
        ))}
        {renderCalendar()}
      </Calendar>
    </CalendarContainer>
  );
};

export default TaskCalendar; 