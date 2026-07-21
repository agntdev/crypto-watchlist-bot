import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📋 Watchlist", data: "watchlist:show", order: 10 });

const composer = new Composer();

composer.command("watchlist", async (ctx) => {
  await ctx.reply("Here's your current watchlist — use /price to check live prices.");
});

composer.callbackQuery("watchlist:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here's your current watchlist:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;