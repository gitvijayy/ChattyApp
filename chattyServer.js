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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//     client.send(data);
//     }
//   });
// };

wss.on('connection', (ws) => {
  console.log('Client connected');

  let clientCount = { type: "count", count: wss.clients.size }

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientCount))
  });

  ws.on('message', (message) => {

    message = JSON.parse(message)
    message[0].id = uuidv1()
    if (message.length === 2) {

      message[1].id = uuidv1()
    }

    // notification = JSON.parse(notification)
    // if (notification !== {}) {
    //   notification.id = uuidv1()
    // }

    // wss.broadcast = function broadcast() {
    //   wss.clients.send(ws1)

    // }

    wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === wss.OPEN) {
      //console.log(uuidv1())
      client.send(JSON.stringify(message))
      // }
    });

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let clientCount = { type: "count", count: wss.clients.size }

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(clientCount))
    });
    console.log('Client disconnected')
  })
});



