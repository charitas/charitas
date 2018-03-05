import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Header, Icon, Loader, Segment, Message } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledLoader = styled.div`
    padding: 10px;
`;

const StyledDiv = styled.div`
  margin: auto;
  position: relative;
  top: 100px;
  width: 50%;
`;

export default function SignIn({
  error, loading, signIn, submitIfEnter, updateFormByKey,
}) {
  return (
    <StyledDiv>
      <Segment>
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>
            Sign In
          </Header.Content>
        </Header>
        <Form>
          <Form.Input placeholder="Username" onChange={updateFormByKey('username')} onKeyUp={submitIfEnter} />
          <Form.Input placeholder="Password" onChange={updateFormByKey('password')} onKeyUp={submitIfEnter} type="password" />
          <Button color="violet" onClick={signIn} fluid>Sign In</Button>
          <Divider horizontal>Or</Divider>
          <Button color="blue" fluid>Sign Up Now</Button>
        </Form>
        { loading &&
          <StyledLoader>
            <Loader active inline="centered" />
          </StyledLoader>
        }
        { error &&
          <Message negative>
            <p>{error}</p>
          </Message>
        }
      </Segment>
    </StyledDiv>
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
