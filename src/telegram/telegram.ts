import { Telegram } from '@twa-dev/types';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export const telegram = window.Telegram.WebApp;

// Инициализация Telegram Mini App
telegram.ready();

// Включаем главную кнопку
telegram.MainButton.setParams({
  text: 'Создать задачу',
  color: '#2481cc',
});

// Экспортируем методы для работы с Telegram
export const showMainButton = () => telegram.MainButton.show();
export const hideMainButton = () => telegram.MainButton.hide();
export const enableMainButton = () => telegram.MainButton.enable();
export const disableMainButton = () => telegram.MainButton.disable();
export const setMainButtonText = (text: string) => telegram.MainButton.setParams({ text });
export const onMainButtonClick = (callback: VoidFunction) => telegram.MainButton.onClick(callback);

// Методы для работы с темой
export const isDarkMode = telegram.colorScheme === 'dark';
export const backgroundColor = telegram.backgroundColor;
export const textColor = telegram.textColor; 