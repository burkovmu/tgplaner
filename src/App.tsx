import React, { useEffect, useState } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import TaskCalendar from './components/Calendar/TaskCalendar';
import WebApp from '@twa-dev/sdk';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [initStatus, setInitStatus] = useState('Инициализация...');

  useEffect(() => {
    try {
      // Проверяем доступность объекта window.Telegram
      if (window.Telegram?.WebApp) {
        setInitStatus('Telegram.WebApp найден');
        
        // Инициализируем WebApp
        WebApp.ready();
        setInitStatus('WebApp готов');
        
        // Устанавливаем цвет фона
        WebApp.setBackgroundColor('#ffffff');
        
        // Расширяем приложение на весь экран
        WebApp.expand();
      } else {
        setError('Telegram.WebApp не найден. Откройте приложение через Telegram.');
      }
    } catch (err) {
      setError(`Ошибка инициализации: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  if (error) {
    return (
      <div className="App error-container">
        <div className="error-message">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <p>Статус: {initStatus}</p>
          <p>User Agent: {navigator.userAgent}</p>
          <p>Platform: {navigator.platform}</p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <h1>TG Planer</h1>
          <small>{initStatus}</small>
        </header>
        <main>
          <TaskCalendar />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
