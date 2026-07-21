import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "👤 Owner stats", data: "owner:stats", order: 100 });

const composer = new Composer();

composer.command("owner", async (ctx) => {
  await ctx.reply("View usage stats and top alerts");
});

composer.callbackQuery("owner:stats", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("View usage statistics and top alerts:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;