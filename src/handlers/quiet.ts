import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "⏰ Quiet hours", data: "quiet:config", order: 35 });

const composer = new Composer();

composer.command("quiet", async (ctx) => {
  await ctx.reply("Set quiet hours");
});

composer.callbackQuery("quiet:config", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Configure quiet hours when you won't receive price alerts:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;