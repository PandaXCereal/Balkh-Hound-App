require("dotenv").config();
const { App } = require("@slack/bolt");
const axios = require("axios");
// Auth our app.
console.log(process.env.BOT_TOKEN);
const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.BOT_TOKEN
});
const composeMessage = (imageURL, text) => {
  return {
    blocks: [
      {
        type: "image",
        image_url: imageURL,
        alt_text: text || "Afghan Hound"
      }
    ]
  };
};
const fetchDoggo = () =>
  axios("https://dog.ceo/api/breed/hound-afghan/images/random")
    .then(function(response) {
      // handle success
      return composeMessage(response.data.message, "Random Afghan Image");
    })
    .catch(err => err);
// Handle Incoming Messages & Send a response
bot.message("afghan", async ({ context, event }) => {
  const doggo = await fetchDoggo();
  try {
    await bot.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: "Hi",
      ...doggo
    });
  } catch (error) {
    console.error(`error responding ${error}`);
  }
});
// Start our Server
(async () => {
  // Start the app
  await bot.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();