import { Composer } from "grammy";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "💸 Price", data: "price:show", order: 25 });

const composer = new Composer();

composer.command("price", async (ctx) => {
  await ctx.reply("On-demand price check");
});

composer.callbackQuery("price:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here are the current prices for your watched coins:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;