import isAuthenticated from './isAuthenticated';

const appState = (state = {}, action) => ({
  isAuthenticated: isAuthenticated(state.isAuthenticated, action),
});

export default appState;
