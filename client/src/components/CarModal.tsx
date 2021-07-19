import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Car from '../interfaces/Car';
import { RootState } from '../reducers/RootReducer';
import { Modal } from './Modal';

const Flex = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 10%;
  margin-right: 10%;
  max-height: 100%;
  overflow-y: scroll;
`;

interface Props {
  open: boolean;
  close: () => void;
  car: Car;
  addFavorite: (code: string) => void;
  removeFavorite: (code: string) => void;
}

function CarModal({ open, close, car, addFavorite, removeFavorite }: Props) {
  const favorites = useSelector((state: RootState) => state.favorites);

  const checkFavorite = (): boolean => {
    const check: string[] = favorites.filter((fav: any) => fav == car.code);
    if (check.length >= 1) {
      return true;
    }
    return false;
  };

  const removeButton: React.ReactNode = !checkFavorite() ? (
    <Button style={{ width: '95%' }} onClick={() => addFavorite(car.code)}>
      Legg til som favoritt
    </Button>
  ) : (
    <Button style={{ width: '95%' }} onClick={() => removeFavorite(car.code)}>
      Fjern som favoritt
    </Button>
  );

  const body = (
    <Fragment>
      <img
        style={{ width: '30rem', maxHeight: '23rem' }}
        src={car.picture}
      ></img>
      <h3>{car.model_name}</h3>
      {removeButton}
      <Grid container justify="space-between">
        <Grid item xs={12} md={6}>
          <h4>Årsmodell: {car.year_model}</h4>
          <h4>Kilometerstand: {car.mileage.toLocaleString()}</h4>
        </Grid>
        <Grid item xs={12} md={6}>
          {car.prices.map((price, index) => (
            <Flex key={index}>
              <h3>{new Date(price.date).toISOString().slice(0, 10)}:&nbsp;</h3>
              <h3>{price.sum.toLocaleString()}kr</h3>
            </Flex>
          ))}
        </Grid>
      </Grid>
      <Button
        style={{ backgroundColor: 'blue', color: 'white' }}
        onClick={() => window.open(`https://www.finn.no/${car.code}`)}
      >
        Gå til finn-annonse
      </Button>
    </Fragment>
  );

  return (
    <Modal open={open} onClose={close}>
      {body}
    </Modal>
  );
}

export default CarModal;
