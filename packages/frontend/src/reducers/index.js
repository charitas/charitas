import user from './user';

const app = (state = {}, action) => ({
  user: user(state.user, action),
});

export default app;
