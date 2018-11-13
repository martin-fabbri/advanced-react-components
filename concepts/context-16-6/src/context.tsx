import * as React from 'react';

export interface IGraphPanelContext {
  name: string;
}

const GraphPanelContext = React.createContext<IGraphPanelContext>({
  activeTool: GraphPanelTools.Selection,
  createPopDefLabel: (payload: ICreatePopDefLabelPayload) =>
    console.error('createPopDefLabel has not been implemented'),
  gatesPreferences: prefsInitialState.gates,
  onToolSelected: (selectedTool: GraphPanelTools) => console.error('onToolSelected has not been implemented'),
  selectedPopLabels: {},
  selectedPopDefGates: [],
  targetPopulationChildren: {},
  workspacePreferences: prefsInitialState.workspace,
});

export const withGraphPanelContext = <P extends {}>(Component: React.ComponentType<P>) =>
  class WithContext extends React.PureComponent<P> {
    public render() {
      return (
        <GraphPanelContext.Consumer>
          {(context: IGraphPanelContext) => <Component {...this.props} {...context} />}
        </GraphPanelContext.Consumer>
      );
    }
  };

export default GraphPanelContext;
