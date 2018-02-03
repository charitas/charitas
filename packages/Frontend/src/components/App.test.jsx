/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import React from 'react';

import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should a render', () => {
    shallow(<App />);
  });
});
