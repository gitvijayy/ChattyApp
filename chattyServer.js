// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//checking for total number of clients
const clients = (wss) => {
  let clientCount = { type: "count", count: wss.clients.size }
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientCount))
  });
};

wss.on('connection', (ws) => {

  clients(wss);

  ws.on('message', (message) => {
    message = JSON.parse(message)
    message.id = uuidv1()
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message))
    });

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clients(wss);

  })
});



