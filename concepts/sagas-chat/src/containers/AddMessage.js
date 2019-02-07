import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

const mapStateToProps = (state) => ({
})

const bindActionsToDispatch = dispatch => ({
    addMessage: (author, message) => dispatch(addMessage(author, message))
})

const AddMessageContainer = connect(mapStateToProps, bindActionsToDispatch)(AddMessageComponent);

export default AddMessageContainer