import React from 'react';
import { Button } from 'semantic-ui-react';
import googleSignin from './google_signin.png';

export default function Login() {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <img alt="Sign in with Google" src={googleSignin} style={{ maxWidth: '50%' }} />
      <Button color="green">Sign in</Button>
    </div>
  );
}
