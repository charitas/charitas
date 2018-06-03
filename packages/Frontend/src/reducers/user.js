const user = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return { isAuthenticated: false };
  }
};

export default user;
