import { Telegraf } from 'telegraf';
import { generateFile } from '@d-projects/dibikin-gampang/features/generate';
export async function App(
  bot: Telegraf,
  sheetId: string,
  clientEmail: string,
  privateKey: string
) {
  await generateFile(bot, sheetId, clientEmail, privateKey);
  return bot;
}
