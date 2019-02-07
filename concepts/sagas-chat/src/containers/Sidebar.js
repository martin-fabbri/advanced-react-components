import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

const mapStateToProps = (state) => ({
    users: state.users
})

const SidebarContainer = connect(mapStateToProps)(SidebarComponent);

export default SidebarContainer
