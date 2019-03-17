import * as React from 'react';
import Button from './button';

interface IProps {
    debug?: boolean;
}

class Toobar extends React.Component<IProps> {
    public render() {
        return (
            <>
                <Button>Edit</Button>
                <Button><span>Save</span></Button>
                <Button>Toggle</Button>
            </>
        );
    };
}

export default Toobar;