import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Header, Icon, Loader, Segment, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import colors from '../constants/colors';

const StyledLoader = styled.div`
    padding: 10px;
`;

const StyledDiv = styled.div`
  margin: auto;
  position: relative;
  width: 350px;
  @media(max-width: 599px) {
    top: 50px;
  }
  @media(min-width: 600px) {
    top: 100px;
  }

  .ui.blue.button, .ui.blue.buttons {
    margin-bottom: 10px;
    background-color: ${colors.blue};
  }

  .ui.violet.button, .ui.violet.buttons {
    margin-bottom: 10px;
    background-color: ${colors.purple};
  }

  .button {
    height: 45px;
  }
`;

const handleErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email, please try again';
    case 'auth/email-already-in-use':
      return 'This email already exists, please sign in';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/operation-not-allowed':
      return 'Could not sign in, please contact the site administrator';
    default:
      return 'Could not sign in, please check your email and password and try again';
  }
};

export default function Authenticate({
  authenticate, error, loading, signingin, updateFormByKey,
}) {
  const signUpButton = (
    <Button color="blue" onClick={authenticate} fluid>Sign Up</Button>
  );

  const signInButton = (
    <Button color="violet" onClick={authenticate} fluid>Sign In</Button>
  );

  const SIGN_IN = 'Sign In';
  const SIGN_UP = 'Sign Up';

  return (
    <StyledDiv>
      <Segment style={{ border: 'none', boxShadow: 'none', backgroundColor: `${colors.white}` }}>
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>
            {signingin ? SIGN_IN : SIGN_UP}
          </Header.Content>
        </Header>
        <Form>
          <Form.Input placeholder="Email" onChange={updateFormByKey('email')} />
          <Form.Input placeholder="Password" onChange={updateFormByKey('password')} type="password" />
          {!signingin && (
          <Form.Input placeholder="Confirm Password" onChange={updateFormByKey('confirmPassword')} type="password" />
          )}
          {signingin ? signInButton : signUpButton}
          <Divider horizontal>Or</Divider>
          {signingin ?
            <Link href="/signup" to="/signup">
              <Button color="blue" fluid>{SIGN_UP}</Button>
            </Link> :
            <Link href="/signin" to="/signin">
              <Button color="violet" fluid>{SIGN_IN}</Button>
            </Link>
          }
          <Button
            color="blue"
            onClick={() => authenticate('google')}
            fluid
            style={{
                  backgroundColor: '#4285F4',
                  backgroundImage: 'url(\'https://firebasestorage.googleapis.com/v0/b/thesourceoftruth-28554.appspot.com/o/btn_google_light_normal_ios.svg?alt=media&token=d1349925-4489-44dc-9e47-8037a8a6d14f\')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0px 0px',
                  fontFamily: '\'Roboto\', sans-serif',
                  src: 'url(\'https://fonts.googleapis.com/css?family=Roboto\')',
                  height: '46px',
                }}
          >
                Sign in with Google
          </Button>
        </Form>
        { loading && (
        <StyledLoader>
          <Loader active inline="centered" />
        </StyledLoader>
        )}
        { error && (
        <Message negative>
          <p>{handleErrorMessage(error)}</p>
        </Message>
        )}
      </Segment>
    </StyledDiv>
  );
}

Authenticate.propTypes = {
  authenticate: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      message: PropTypes.string,
      code: PropTypes.string,
    }),
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  signingin: PropTypes.bool,
  updateFormByKey: PropTypes.func.isRequired,
};

Authenticate.defaultProps = {
  signingin: false,
};
