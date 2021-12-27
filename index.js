const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const Client = new (require('discord.js')).Client({
  intents: 1795
});
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const serv = require('http').Server(app);
app.use(express.static("public"));
serv.listen(process.env.PORT);
app.get("/", (request, response) => {
  response.sendFile('index.html', { root: '.' })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is live on port ${port}`));
const io = require('socket.io')(serv, {});

io.sockets.on('connection', async socket => {
  console.log('conexão estabelecida')
  socket.on('requestUser', async (data) => {
    console.log('reqUser')
    const userResult = await oauth.getUser(data.access_token).catch(e => e)
    if (userResult) socket.emit('getUser', userResult);
  })
})