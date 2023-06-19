import { Telegraf, Scenes, Context, session } from 'telegraf';
import {
  loadDocument,
  convertToDocx,
  authUser,
} from '@d-projects/dibikin-gampang/utils';
import {
  CusContextCommand,
  CusWizardScene,
} from '@d-projects/dibikin-gampang/utils';
import * as fs from 'fs';

export async function generateFile(
  bot: Telegraf,
  sheetId: string,
  clientEmail: string,
  privateKey: string
): Promise<Telegraf<Context>> {
  const generateScene = new Scenes.WizardScene<CusWizardScene>(
    'generate',
    async (ctx) => {
      await ctx.reply('masukkan kode sheet');
      return ctx.wizard.next();
    },
    async (ctx) => {
      const message = ctx.message.text;

      const docs = await loadDocument(
        message.toUpperCase(),
        sheetId,
        clientEmail,
        privateKey
      );
      if (docs.status === 404) {
        ctx.reply(`Sheet ${message} tidak ditemukan`);
        return await ctx.scene.leave();
      }
      const result = await convertToDocx(docs.data);
      await ctx
        .replyWithDocument({
          source: result.path,
        })
        .then(() => {
          fs.unlink(result.path, (err) => {
            if (err) {
              console.error(err);
            }
          });
        });
      ctx.reply(`Berkas  Telah di proses `);
      return await ctx.scene.leave();
    }
  );
  bot.use(session());
  const stage = new Scenes.Stage([generateScene]);
  bot.use(stage.middleware());
  bot.command('generate', async (ctx: CusContextCommand) => {
    const credUser = await authUser(ctx.from.id);
    if (!credUser.length) {
      console.log(ctx.from);
      await ctx.reply(
        `Hey ${ctx.from.username}, kamu tidak di ijinkan menggunakan layanan ini. Silahkan daftar terlebih dahulu`
      );
    } else {
      await ctx.scene.enter('generate');
    }
  });
  return bot;
}
