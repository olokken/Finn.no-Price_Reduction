import {
  createStyles,
  Grid,
  makeStyles,
  Modal,
  Theme,
} from '@material-ui/core';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';
import React from 'react';
import styled from 'styled-components';
import Car from '../interfaces/Car';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const Flex = styled.div`
  display: flex;
`;

function getModalStyle() {
  const top = 20 + rand();
  const left = 20 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      justifyContent: 'center',
      maxHeight: 'auto',
      marginTop: '2rem',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

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
}

function CarModal({ open, close, car }: Props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    close();
  };

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <img
        style={{ width: '30rem', maxHeight: '23rem' }}
        src={car.picture}
      ></img>
      <h3>{car.model_name}</h3>
      <Grid container justify="space-between">
        <Grid item>
          <h4>Årsmodell: {car.year_model}</h4>
          <h4>Kilometerstand: {car.mileage.toLocaleString()}</h4>
        </Grid>
        <Grid>
          {car.prices.map((price, index) => (
            <Flex key={index}>
              <h3>{new Date(price.date).toISOString().slice(0, 10)}:&nbsp;</h3>
              <h3>{price.sum.toLocaleString()}kr</h3>
            </Flex>
          ))}
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default CarModal;
