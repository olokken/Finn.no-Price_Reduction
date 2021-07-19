import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import LoginCard from '../components/LoginCard';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../graphQL/Mutations';
import { useMutation } from '@apollo/client';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #334d50; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login] = useMutation(LOGIN);

  const onLogin = async () => {
    try {
      const response = await login({
        variables: { username: username, password: password },
      });
      window.localStorage.setItem('token', response.data.login['accessToken']);
      window.localStorage.setItem('id', response.data.login['id']);
      history.push('/mainPage');
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const onNewUser = () => {
    history.push('/newUser');
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
