import appState from './appState';

const app = (state = {}, action) => ({
  appState: appState(state.appState, action),
});

export default app;
