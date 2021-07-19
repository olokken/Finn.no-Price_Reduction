import { Drawer, makeStyles } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Car from '../interfaces/Car';
import CarCard from './CarCard';
import CarModal from './CarModal';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/RootReducer';

const Container = styled.div`
  margin: 1rem;
  margin-bottom: 7rem;
`;

interface Props {
  cars: Car[];
  open: boolean;
  addFavorite: (code: string) => void;
  removeFavorite: (code: string) => void;
}

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '4.5%',
    width: '21%',
  },
});

const Favorites = ({ open, cars, removeFavorite, addFavorite }: Props) => {
  const classes = useStyles();
  const [currentCar, setCurrentCar] = useState<Car>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const favorites = useSelector((state: RootState) => state.favorites);

  const MapFavorites = (): React.ReactNode[] => {
    return cars.map((car) => {
      if (favorites.includes(car.code)) {
        return (
          <CarCard
            key={car.code}
            car={car}
            onClick={() => {
              setCurrentCar(car);
              setOpenModal(true);
            }}
          ></CarCard>
        );
      }
    });
  };

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      variant="persistent"
      anchor="right"
    >
      <Container>
        <h1> Dine favoritter </h1>
        {!localStorage.getItem('id') && (
          <h3>Logg inn for å legge til favoritter</h3>
        )}
        {MapFavorites()}
      </Container>
      {currentCar && (
        <CarModal
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          close={() => setOpenModal(false)}
          open={openModal}
          car={currentCar}
        ></CarModal>
      )}
    </Drawer>
  );
};

export default Favorites;
