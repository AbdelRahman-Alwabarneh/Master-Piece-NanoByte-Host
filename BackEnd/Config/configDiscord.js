// config.js
module.exports = {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID, // ضع Client ID هنا
      clientSecret: process.env.DISCORD_CLIENT_SECRET, // ضع Client Secret هنا
      redirectUri: 'http://localhost:2000/api/discordAuth/discord/callback', // ضع Redirect URI هنا
    },
  };