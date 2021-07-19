import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/Filter/SideBar';
import CarGrid from '../components/CarGrid';
import Favourites from '../components/Favorites';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS, GET_FAVORITES } from '../graphQL/Queries';
import Car from '../interfaces/Car';
import Bar from '../components/Bar';
import { FilterFunctions } from '../components/Filter/Functions';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../graphQL/Mutations';
import { useDispatch } from 'react-redux';
import { set, add, remove } from '../actions';

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
  const [openFavorites, setOpenFavorites] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(GET_CARS);
  const { data: fav } = useQuery(GET_FAVORITES, {
    variables: { id: localStorage.getItem('id') },
  });
  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

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

  const loadFavorites = async () => {
    if (fav) {
      dispatch(set(fav.getUser.favorites));
    }
  };

  const addNewFavorite = (code: string) => {
    addFavorite({
      variables: {
        userId: localStorage.getItem('id'),
        code: code,
      },
    })
      .then((data) => {
        dispatch(add(code));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeNewFavorite = (code: string) => {
    removeFavorite({
      variables: {
        userId: localStorage.getItem('id'),
        code: code,
      },
    })
      .then((data) => {
        console.log(data);
        dispatch(remove(code));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadFavorites();
  }, [fav]);

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
          <CarGrid
            cars={currentCars}
            addFavorite={(id: string) => addNewFavorite(id)}
            removeFavorite={(id: string) => removeNewFavorite(id)}
          ></CarGrid>
          {loading && <h1 style={{ marginLeft: '50%' }}>Loading</h1>}
        </div>
        <Favourites
          removeFavorite={removeNewFavorite}
          addFavorite={(code: string) => addNewFavorite(code)}
          open={openFavorites}
          cars={cars}
        ></Favourites>
      </ContentContainer>
    </MainPageContainer>
  );
};

export default MainPage;
