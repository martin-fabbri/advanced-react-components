import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const MessageList = ({ messages }) => {
    console.log('messages', messages)
    return (
        <section id="messages-list">
            <ul>
                {messages.map(message => (
                    <Message key={message.id} {...message} />
                ))}
            </ul>
        </section>
    )
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default MessageList
