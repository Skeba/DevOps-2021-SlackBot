
const { App, ExpressReceiver } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver,
});
app.event("app_mention", async ({}) => {});
receiver.router.get("/", (_req, res) => {
  res.send("You can access this page without x-slack- headers!");
});
app.command("/knowledge", async ({ command, ack, say }) => {
    try {
      await ack();
      say("Yaaay! that command works!");
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

