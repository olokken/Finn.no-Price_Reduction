import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import SideBar from '../components/Filter/SideBar';
import CarGrid from '../components/CarGrid';
import Favourites from '../components/Favourites';
import { UserContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../graphQL/Queries';
import Car from '../interfaces/Car';
import Bar from '../components/Bar';
import { FilterFunctions } from '../components/Filter/Functions';

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
  const [currentCars, setCurrentCars] = useState<Car[]>([]);
  const { user } = useContext(UserContext);
  const { loading, data } = useQuery(GET_CARS);
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [priceAdjustmentFilter, setPriceAdjustmentFilter] =
    useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [yearFilter, setYearFilter] = useState<number[]>([]);
  const [mileageFilter, setMileageFilter] = useState<number[]>([]);

  const loadCars = async () => {
    if (data) {
      const cars: Car[] = await data.getCars;
      setCars(cars);
      setCurrentCars(cars);
    }
  };

  useEffect(() => {
    loadCars();
  }, [data]);

  useEffect(() => {
    if (!loading) {
      setCurrentCars(cars);
      let filtered = FilterFunctions.searchFilter(cars, search);
      console.log(mileageFilter);
      filtered = FilterFunctions.mileageFilter(filtered, mileageFilter);
      filtered = FilterFunctions.priceFilter(filtered, priceFilter);
      filtered = FilterFunctions.yearModelFilter(filtered, yearFilter);
      filtered = FilterFunctions.priceAdjustmentFilter(
        filtered,
        priceAdjustmentFilter
      );
      setCurrentCars(filtered);
    }
  }, [search, priceAdjustmentFilter, priceFilter, yearFilter, mileageFilter]);

  return (
    <MainPageContainer>
      <Bar showFavorites={() => setOpenFavorites(!openFavorites)}></Bar>
      <ContentContainer>
        <SideBar
          onMileageFilterChange={(val) => setMileageFilter(val)}
          onSearchChange={(val) => setSearch(val)}
          onPriceAdjustmentFilterChange={(val) => setPriceAdjustmentFilter(val)}
          onPriceFilterChange={(val) => setPriceFilter(val)}
          onYearModelFilterChange={(val) => setYearFilter(val)}
        ></SideBar>
        <div style={openFavorites ? { marginRight: '22%' } : {}}>
          <CarGrid cars={currentCars}></CarGrid>
          {loading && <h1 style={{ marginLeft: '50%' }}>Loading</h1>}
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
