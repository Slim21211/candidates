// api/bot.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
const mode = process.env.MODE || 'production'; // в .env локально у тебя local, на Vercel ставим production
const baseUrl = process.env.BASE_URL || process.env.VITE_BASE_URL || 'https://example.com';

if (!token) {
  throw new Error('BOT_TOKEN не найден в env');
}

export const bot = new Telegraf(token);

// --- Логика бота (оставил твою, чуть аккуратнее) ---
bot.start((ctx) => {
  return ctx.reply('Приветственное сообщение', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Заполнить анкету',
            web_app: { url: `${baseUrl}/form` } // <-- сразу открывает Web App
          }
        ],
        [{ text: 'О компании' }]
      ],
      resize_keyboard: true
    }
  });
});

bot.command('restart', (ctx) => {
  return ctx.reply('Restart');
});

bot.on('message', async (ctx) => {
  // не удаляем сообщение, если это не текст (защита)
  try {
    if (ctx.message && 'text' in ctx.message) {
      const text = ctx.message.text;

      if (text === 'О компании') {
        return ctx.reply('Good company');
      }

      if (text === 'Заполнить анкету') {
        return ctx.reply('Открыть анкету', {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Открыть',
                  web_app: { url: `${baseUrl}/form` }
                }
              ]
            ]
          }
        });
      }
    }
  } catch (err) {
    console.error('Ошибка при обработке message:', err);
  }
});

// --- Polling в режиме локальной разработки ---
if (mode === 'local') {
  (async () => {
    await bot.launch();
    console.log('Бот запущен в режиме polling (local)');
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  })();
}

// --- Экспорт handler для Vercel (webhook) ---
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Telegram будет присылать POST с JSON
  if (req.method === 'POST') {
    try {
      // Vercel автоматически парсит JSON тело
      await bot.handleUpdate(req.body);
      // Telegram ожидает 200 OK быстро
      return res.status(200).send('OK');
    } catch (err) {
      console.error('bot.handleUpdate error:', err);
      return res.status(500).send('error');
    }
  }

  // GET /api/bot — полезно для проверки доступности функции
  res.status(200).send(`Bot is live (mode=${mode})`);
}
