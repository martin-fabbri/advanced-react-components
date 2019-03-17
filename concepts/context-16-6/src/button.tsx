import * as React from 'react';
import { ReactNode } from "react";
import AppContext from "./context";

interface IProps {
    onClick?: () => void;
    children?: ReactNode;
}

class Button extends React.Component<IProps> {
    public static contextType = AppContext;
    public render() {
        const {theme, toggleTheme} = this.context;
        const {children} = this.props;
        return (
            <button style={{background: theme.background, color: theme.foreground}}
                    onClick={toggleTheme}>
                {children}
            </button>
        );
    }


}

export default Button;