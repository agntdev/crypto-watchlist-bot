import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "➖ Remove ticker", data: "watch:ticker:remove", order: 16 });

const composer = new Composer();

composer.command("unwatch", async (ctx) => {
  await ctx.reply("Remove a ticker from the watchlist");
});

composer.callbackQuery("watch:ticker:remove", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Send a ticker symbol to remove from your watchlist.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;