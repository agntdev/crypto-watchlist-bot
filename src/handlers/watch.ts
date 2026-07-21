import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Adds a "Watchlist" button to the /start main menu (no slash command).
registerMainMenuItem({ label: "📋 Watchlist", data: "watchlist:show", order: 10 });
registerMainMenuItem({ label: "➕ Add ticker", data: "watch:ticker:add", order: 15 });
registerMainMenuItem({ label: "➖ Remove ticker", data: "watch:ticker:remove", order: 16 });

const composer = new Composer();

composer.command("watch", async (ctx) => {
  await ctx.reply("Add a ticker to the watchlist");
});

composer.command("watchlist", async (ctx) => {
  await ctx.reply("Show current watchlist");
});

composer.callbackQuery("watch:ticker:add", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Send a ticker symbol to add to your watchlist (e.g. BTC or ethereum).", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

composer.callbackQuery("watch:ticker:remove", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Send a ticker symbol to remove from your watchlist.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

composer.callbackQuery("watchlist:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here's your current watchlist:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;