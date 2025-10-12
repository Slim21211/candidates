import { Markup, Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
const mode = process.env.MODE || 'production';

if (!token) {
  throw new Error('BOT_TOKEN не найден');
}

export const bot = new Telegraf(token);

bot.start((ctx) => {

  return ctx.reply(
    'Приветственное сообщение',
    Markup.keyboard([['О компании'], ['Заполнить анкету']]).resize()
  );
});

bot.command('restart', ctx => {
  return ctx.reply('Restart')
})

bot.on('message', ctx => {
  ctx.deleteMessage();

  if (ctx.text === 'О компании') {
    return ctx.reply('Good company')
  }

  if (ctx.text === 'Заполнить анкету') {
    return ctx.reply('Open mini app form')
  }
})

if (mode === 'local') {
  bot.launch();
  console.log('Бот запущен в режиме polling');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}