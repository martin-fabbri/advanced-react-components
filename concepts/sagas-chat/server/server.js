const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8989})
const uuid = require('uuid/v4');

const users = []

const broadcast = (data) => {
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message)
        switch (data.type) {
            case 'ADD_USER':
                users.push({
                    id: uuid(),
                    name: data.name,
                })
                ws.send(JSON.stringify({
                    type: 'USERS_LIST',
                    users,
                }))
                // broadcast({
                //     type: 'USERS_LIST',
                //     users,
                // })
                break
            case 'ADD_MESSAGE':
                // broadcast({
                //     type: 'ADD_MESSAGE',
                //     message: data.message,
                //     author: data.author,
                // })
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'ADD_MESSAGE',
                            message: data.message,
                            author: data.author,
                        }));
                    }
                });
                break
            default:
                break
        }
    })
})