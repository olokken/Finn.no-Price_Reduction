import React, { ChangeEvent, useState, useEffect } from 'react';
import { Slider, TextField } from '@material-ui/core';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 20%;
  min-width: 20rem;
`;

interface Props {
  headline: string;
  minValue: number;
  maxValue: number;
  onValueChange: (value: number[]) => void;
}

const Filter = ({ minValue, maxValue, headline, onValueChange }: Props) => {
  const [value, setValue] = useState<number[]>([minValue, maxValue]);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = [parseInt(event.target.value), value[1]];
    setValue(newValue);
  };

  const onChangeValue2 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = [value[0], parseInt(event.target.value)];
    setValue(newValue);
  };

  return (
    <SliderContainer>
      <h2>{headline}</h2>
      <TextField
        style={{ width: '45%', marginBottom: 24, marginRight: '5px' }}
        onChange={onChangeValue}
        value={value[0]}
        id="filled-number"
        label="Min"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        style={{ width: '45%', marginBottom: 24, marginRight: '5px' }}
        onChange={onChangeValue2}
        value={value[1]}
        id="filled-number"
        label="Max"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        min={minValue}
        max={maxValue}
      />
    </SliderContainer>
  );
};

export default Filter;
