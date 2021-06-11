import React, { useEffect, useState } from 'react';
import { GridList, Modal } from '@material-ui/core';
import Car from '../interfaces/Car';
import styled from 'styled-components';
import CarCard from './CarCard';
import Pageination from '@material-ui/lab/Pagination';
import CarModal from './CarModal';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  width: 100%;
`;

interface Props {
  cars: Car[];
}

const CarGrid = ({ cars }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [currentCars, setCurrentCars] = useState<Car[]>(cars);
  const [clickedCar, setClickedCar] = useState<Car>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setCurrentCars(cars.slice(startIndex, endIndex));
  }, [page, cars]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onCarClick = (car: Car) => {
    setClickedCar(car);
    setOpenModal(true);
  };

  return (
    <Container>
      <GridList
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
        cols={4}
      >
        {currentCars.map((car, index) => (
          <CarCard onClick={onCarClick} key={index} car={car}></CarCard>
        ))}
      </GridList>
      <Pageination
        style={{
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '3rem',
        }}
        onChange={onPageChange}
        count={Math.ceil(cars.length / 12)}
        size="large"
      />
      {clickedCar && (
        <CarModal
          car={clickedCar}
          open={openModal}
          close={() => setOpenModal(false)}
        ></CarModal>
      )}
    </Container>
  );
};
export default CarGrid;
