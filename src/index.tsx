import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebApp from '@twa-dev/sdk'

// Отображаем сообщение об инициализации
const initMessage = document.createElement('div');
initMessage.style.position = 'fixed';
initMessage.style.top = '50%';
initMessage.style.left = '50%';
initMessage.style.transform = 'translate(-50%, -50%)';
initMessage.style.backgroundColor = 'white';
initMessage.style.padding = '20px';
initMessage.style.borderRadius = '8px';
initMessage.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
initMessage.style.zIndex = '9999';
initMessage.textContent = 'Инициализация приложения...';
document.body.appendChild(initMessage);

try {
  // Проверяем доступность объекта window.Telegram
  if (!window.Telegram) {
    initMessage.textContent = 'Ошибка: window.Telegram не найден';
    throw new Error('window.Telegram не найден');
  }

  if (!window.Telegram.WebApp) {
    initMessage.textContent = 'Ошибка: window.Telegram.WebApp не найден';
    throw new Error('window.Telegram.WebApp не найден');
  }

  // Инициализируем WebApp
  WebApp.ready();
  initMessage.textContent = 'WebApp инициализирован';

  // Получаем root элемент
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    initMessage.textContent = 'Ошибка: элемент root не найден';
    throw new Error('элемент root не найден');
  }

  // Создаем root и рендерим приложение
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Если все успешно, удаляем сообщение об инициализации
  setTimeout(() => {
    document.body.removeChild(initMessage);
  }, 2000);

} catch (error) {
  // В случае ошибки показываем её
  console.error('Ошибка инициализации:', error);
  initMessage.style.backgroundColor = '#fff3e0';
  initMessage.style.color = '#e65100';
  initMessage.textContent = `Ошибка: ${error.message}\n\nUser Agent: ${navigator.userAgent}`;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
