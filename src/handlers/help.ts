import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("help", async (ctx) => {
  await ctx.reply("ℹ️ Tap /start to open the menu, then pick what you want from the buttons.\n\nEverything in this bot is reachable by tapping — you don't need to remember any commands.");
});

composer.callbackQuery("menu:help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("ℹ️ Tap /start to open the menu, then pick what you want from the buttons.\n\nEverything in this bot is reachable by tapping — you don't need to remember any commands.");
});

export default composer;