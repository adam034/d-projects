import { Telegraf, Scenes, Context } from 'telegraf';

export async function generateFile(
  bot: Telegraf,
  sheetId: string,
  clientEmail: string,
  privateKey: string
): Promise<Telegraf<Context>> {
  bot.command('/trial', async (ctx) => {
    console.log(ctx);
    await ctx.reply(
      `Halo ${ctx.from.username}, terimakasih sudah melakukan pendaftaran. Mimin akan segera proses yah`
    );
  });
  return bot;
}
