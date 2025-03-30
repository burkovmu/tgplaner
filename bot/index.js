const { Telegraf } = require('telegraf');
const bot = new Telegraf('7715596123:AAEz-ZewFwDl8YzUADIWp-Si3sIG26deOlg');

bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в TGPlaner!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Открыть TGPlaner', web_app: { url: 'https://tgplaner.vercel.app' } }]
      ]
    }
  });
});

bot.launch().then(() => {
  console.log('Бот запущен');
}).catch((err) => {
  console.error('Ошибка при запуске бота:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 