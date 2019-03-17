import * as React from 'react';
import AppContext, {ITheme, themes} from './context';
import Toolbar from './toolbar';

interface IProps {
    debug?: boolean;
}

interface IState {
    theme: ITheme;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {theme: themes.dark};
    }
    public render() {
        const {theme} = this.state;
        console.log('render', theme);
        return (
            <AppContext.Provider value={{
                theme,
                toggleTheme: this.handleToggleTheme,
            }}>
                <Toolbar/>
            </AppContext.Provider>
        );
    }
    private handleToggleTheme = () => {
        const {theme} = this.state;
        console.log('handleToggleTheme', theme === themes.dark ? themes.light : themes.dark);
        this.setState({
            theme: theme === themes.dark ? themes.light : themes.dark,
        })
    }
}

export default App;

