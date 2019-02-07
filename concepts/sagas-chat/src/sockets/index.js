import * as TYPES from '../types/'
import { addMessage, addUser, messageReceived, populateUsersList } from '../actions'

const setupSocket = (dispatch, username) => {
    const socket = new WebSocket('ws://localhost:8989')

    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: TYPES.ADD_USER,
            name: username,
        }))
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('socket onmessage', data);
        switch (data.type) {
            case TYPES.ADD_MESSAGE:
                console.log('ADD_MESSAGE', data)
                dispatch(messageReceived(data.message.message, data.author))
                break
            case TYPES.ADD_USER:
                dispatch(addUser(data.name))
                break
            case TYPES.USER_LIST:
                console.log('socket USER_LIST', data.users);
                dispatch(populateUsersList(data.users))
                break
            default:
                break
        }
    }

    return socket
}

export default setupSocket
