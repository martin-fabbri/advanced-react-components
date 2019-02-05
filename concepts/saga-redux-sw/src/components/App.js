import React, { Component } from 'react'

class App extends Component {
    state = {
        open: false,
        count: 0,
    }
    render() {
        const { starWars } = this.props
        const { open, count } = this.state
        return (
            <div className="App">
                <h1>Redux Saga</h1>
                <div>
                    {starWars.people.map((person, i) => (
                        <h4 key={i}>{person.name}</h4>
                    ))}
                </div>
                <div>
                    {starWars.planet.map((planet, i) => (
                        <h4 key={i}>{planet.name}</h4>
                    ))}
                </div>
                <div>
                    <h3># of Button clicks: {count}</h3>
                    <h3># of Saga effects: {starWars.count}</h3>
                </div>
                <div>
                    <div style={!open ? {display: 'none'}: {}}>
                        <button onClick={this.handleConfirmClick}>Confirm</button>
                    </div>
                </div>
                <button onClick={this.handleFetchPeopleClick}>Load People</button>
                <button onClick={this.handleFetchPlanetClick}>Load Planets</button>
                <button onClick={this.handleQueue}>Queue Channel</button>
            </div>
        )
    }

    handleFetchPeopleClick = () => {
        const { fetchStarWarsRequest } = this.props
        fetchStarWarsRequest()
    }

    handleFetchPlanetClick = () => {
        const { fetchStarWarsPlanetRequest } = this.props
        console.log('handleFetchPlanetClick PLANET');
        fetchStarWarsPlanetRequest()
    }

    handleConfirmClick = () => {
        const { confirmFetchRequest } = this.props
        confirmFetchRequest()
    }

    handleQueue = () => {
        const { queueChannelRequest } = this.props;
        const { count } = this.state;
        queueChannelRequest()
        this.setState({
            ...this.state,
            count: count + 1,
        })
    }
}

export default App
