import { AppBar, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

const MainPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <AppBar position='fixed'>
        <Toolbar style={{justifyContent:'center'}}>Hei og Velkommen</Toolbar>
      </AppBar>
      <SideBar></SideBar>
    </MainPageContainer>
  );
};

export default MainPage;
