import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import CarGrid from '../components/CarGrid';
import Favourites from '../components/Favourites';
import { UserContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../graphQL/Queries';
import Car from '../interfaces/Car';
import Bar from '../components/Bar';

const MainPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
`;

const ContentContainer = styled.div`
  margin-top: 4.5%;
  display: flex;
  width: 100%;
`;

const MainPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { loading, data } = useQuery(GET_CARS);
  const [openFavorites, setOpenFavorites] = useState<boolean>(true);

  const loadCars = async () => {
    if (data) {
      const cars: Car[] = await data.getCars;
      setCars(cars);
    }
  };
  useEffect(() => {
    loadCars();
  }, [data]);

  return (
    <MainPageContainer>
      <Bar showFavorites={() => setOpenFavorites(!openFavorites)}></Bar>
      <ContentContainer>
        <SideBar></SideBar>
        <div style={openFavorites ? { marginRight: '22%' } : {}}>
          <CarGrid cars={cars}></CarGrid>
        </div>
        <Favourites
          open={openFavorites}
          close={() => setOpenFavorites(false)}
          favourites={cars}
        ></Favourites>
      </ContentContainer>
    </MainPageContainer>
  );
};

export default MainPage;
