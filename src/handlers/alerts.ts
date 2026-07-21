import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "🔔 Alerts", data: "alerts:config", order: 30 });

const composer = new Composer();

composer.command("alerts", async (ctx) => {
  await ctx.reply("Configure alert types");
});

composer.callbackQuery("alerts:config", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Configure alert types for your watchlist:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;