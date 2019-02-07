import React from 'react'
import PropTypes from 'prop-types'

const AddMessage = props => {
    const { addMessage } = props
    const handleKeyPressed = e => {
        if (e.key === 'Enter') {
            console.log('before calling action', e.target.value)
            addMessage('Me', e.target.value)
            e.target.value = ''
        }
    }
    return (
        <section id="new-message">
            <input onKeyPress={handleKeyPressed} type="text" />
        </section>
    )
}

AddMessage.propTypes = {
    addMessage: PropTypes.func.isRequired,
}

export default AddMessage
