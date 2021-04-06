import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import LoginCard from '../components/LoginCard';
import { useHistory } from 'react-router-dom';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    history.push('/chat');
  };

  const onNewUser = () => {
    history.push("/newUser")
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername((event.target as HTMLInputElement).value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      onLogin();
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        onLogin={onLogin}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword}
        onKeyDown={onKeyDown}
        onNewUser={onNewUser}
      ></LoginCard>
    </LoginContainer>
  );
};

export default Login;
