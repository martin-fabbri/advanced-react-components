import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

const mapStateToProps = (state) => ({
    messages: state.messages
})

const MessagesListContainer = connect(mapStateToProps)(MessagesListComponent);

export default MessagesListContainer
