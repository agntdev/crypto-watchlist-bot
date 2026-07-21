import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📊 Summary", data: "summary:config", order: 40 });

const composer = new Composer();

composer.command("summary", async (ctx) => {
  await ctx.reply("Enable/disable morning summary");
});

composer.callbackQuery("summary:config", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Configure your morning crypto price summary:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;