import { connect } from 'react-redux'
import App from '../components/App'

import {
    fetchStarWarsRequest,
    confirmFetchRequest,
    fetchStarWarsPlanetRequest,
    queueChannelRequest,
} from '../actions'

const mapStateToProps = ({starWars}) => ({starWars})

const bindActionsToDispatch = dispatch => ({
    fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
    confirmFetchRequest: () => dispatch(confirmFetchRequest()),
    fetchStarWarsPlanetRequest: () => dispatch(fetchStarWarsPlanetRequest()),
    queueChannelRequest: () => dispatch(queueChannelRequest()),
})

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(App);

export default AppContainer