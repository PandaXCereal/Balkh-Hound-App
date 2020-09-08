require('dotenv').config();
const {App} = require("@slack/bolt");

//Auth Bot
const bot = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.BOT_TOKEN
})

/*(async()=>{
    await bot.start(process.env.PORT || 3000);
    Promise()
    console.log("Bolt app is running!");

})();*/
