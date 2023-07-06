import { Telegraf } from 'telegraf';
import { generateFile } from '@d-projects/dibikin-gampang/features/generate';
import { users } from '@d-projects/dibikin-gampang/features/users';
import { WelcomeMessage } from '@d-projects/dibikin-gampang/utils';
export async function App(
  bot: Telegraf,
  sheetId: string,
  clientEmail: string,
  privateKey: string
) {
  await generateFile(bot, sheetId, clientEmail, privateKey);
  await users(bot);
  bot.command('start', async (ctx) => {
    ctx.reply(`${WelcomeMessage(ctx.from.username)}`);
  });
  return bot;
}
