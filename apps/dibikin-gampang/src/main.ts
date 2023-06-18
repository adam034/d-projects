import { Telegraf } from 'telegraf';
import { environment } from './environments/environment';
import { App } from './app/app';
(async () => {
  console.log('Start bot ...');
  const bot = new Telegraf(environment.token);
  const start = await App(
    bot,
    environment.sheet_id,
    environment.client_email,
    environment.private_key
  );
  start.launch();
})();
