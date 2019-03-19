import React from 'react';

interface IProps {
   query: string;
}

interface IState {
   matches: boolean;
}

class Media extends React.Component<IProps, IState> {
   private removeListener: () => void;

   constructor(props: IProps) {
      super(props);
      this.state = {
         matches: window.matchMedia(this.props.query).matches
      }
      this.removeListener = () => {};
   }

   componentDidMount(): void {
      this.setup();
   }

   private setup = () => {
      const { query } = this.props;
      const { matches } = this.state;
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
         this.setState({matches: media.matches});
      }
      const listener = () => this.setState({matches: media.matches});
      media.addListener(listener);
      this.removeListener = () => media.removeListener(listener);
   }

   componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
      if (prevProps.query !== this.props.query) {
         this.removeListener();
         this.setup();
      }
   }

   componentWillUnmount(): void {
      this.removeListener();
   }

   render() {
      const { matches } = this.state;
      if (!this.props.children) {
         return null;
      }
      return this.props.children(matches);
   }
bi}