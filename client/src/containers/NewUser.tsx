import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NewUserCard from '../components/NewUserCard';

const NewUsernContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewUser = () => {
  const history = useHistory();

  const createUser = (username:string, password:string):boolean => {
    console.log(username + password); 
    history.push("/");  
    return true;  
  }

  return (
    <NewUsernContainer>
      <NewUserCard createUser = {createUser}></NewUserCard>
    </NewUsernContainer>
  );
};

export default NewUser;
