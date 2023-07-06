import { Telegraf, Context } from 'telegraf';
import { registerUser } from '@d-projects/dibikin-gampang/utils';
export async function users(bot: Telegraf): Promise<Telegraf<Context>> {
  bot.command('daftar', async (ctx) => {
    const addUser = await registerUser(ctx.from.id);
    if (!addUser) {
      ctx.reply(`User ${ctx.from.username} sudah terdaftar`);
    } else {
      ctx.reply(`Selamat bergabung ${ctx.from.username}`);
    }
  });
  return bot;
}
