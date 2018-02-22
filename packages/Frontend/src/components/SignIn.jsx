import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function SignIn({
  error, loading, signIn, submitIfEnter, updateFormByKey,
}) {
  return (
    <Fragment>
      <p>Username: </p>
      <input onChange={updateFormByKey('username')} onKeyUp={submitIfEnter} />
      <p>Password: </p>
      <input onChange={updateFormByKey('password')} onKeyUp={submitIfEnter} type="password" />
      <button onClick={signIn}>Submit</button>
      { loading ? <p>Loading...</p> : null }
      { error ? <p>{error}</p> : null }
    </Fragment>
  );
}

SignIn.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  submitIfEnter: PropTypes.func.isRequired,
  updateFormByKey: PropTypes.func.isRequired,
};
