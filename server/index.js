var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

CLIENTS = {}

app.use(function (req, res, next) {
  return next();
});

app.get('/', function(req, res, next){
  console.log('route / received');
  res.end();
});

app.ws('/:id', function(ws, req) {
  let id = req.params.id
  if (!CLIENTS[id]) {
    CLIENTS[id] = { connections: [ws], messages: [] }
  } else if (!CLIENTS[id].connections.includes(ws)) {
    CLIENTS[id].connections.push(ws)
  }

  ws.on('message', (message) => {
    const {value, type, name, timeStamp} = JSON.parse(message)
    if (type == 'room_update' && value == 'leaving') {
      CLIENTS[id].connections = CLIENTS[id].connections.filter(c => c != ws)
      if (CLIENTS[id].connections.length == 0) CLIENTS[id].messages = []
      refreshClients(CLIENTS[id], 'room_data')
      sendAll(value, 'leaving', name, timeStamp, id)
      return
    }
    if (type == 'get_room_data') {
      refreshClients(CLIENTS[id], 'room_data')
      sendAll('joining', 'joining', name, timeStamp, id)
      return
    }
    sendAll(value, type, name, timeStamp, id)
  });
});
app.listen(3000);


function sendAll (value, type, name, timeStamp, id) {
  const client = CLIENTS[id]
  for (var i = 0; i < client.connections.length; i++) {
    client.connections[i].send(JSON.stringify({value, type, name, timeStamp}))
  }
  if (CLIENTS[id].connections.length > 0 && (type == 'chat' || type == 'joining' || type == 'leaving')) {
    client.messages.push({value, type, name, timeStamp})
  }
}

function refreshClients (value, type) {
  const connections = [...value.connections]
  const message = JSON.stringify({value, type})
  for (var i = 0; i < connections.length; i++) {
    connections[i].send(message)
  }
}