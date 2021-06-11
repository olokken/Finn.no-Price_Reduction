import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { TextField, Checkbox } from '@material-ui/core';
import styled from 'styled-components';
import Filter from './Filter';

const FilterContainer = styled.div`
  width: 20%;
`;

const Flex = styled.div`
  display: flex;
  margin-top: 1rem;
`;

interface Props {
  onPriceFilterChange: (val: number[]) => void;
  onMileageFilterChange: (val: number[]) => void;
  onYearModelFilterChange: (val: number[]) => void;
  onPriceAdjustmentFilterChange: (val: boolean) => void;
  onSearchChange: (search: string) => void;
}

const SideBar = ({
  onPriceFilterChange,
  onMileageFilterChange,
  onYearModelFilterChange,
  onPriceAdjustmentFilterChange,
  onSearchChange,
}: Props) => {
  const [search, setSearch] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch((event.target as HTMLInputElement).value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    onPriceAdjustmentFilterChange(checked);
    onSearchChange(search);
  }, [search, checked]);

  return (
    <FilterContainer>
      <TextField
        style={{ width: '100%' }}
        id="standard-basic"
        label="Search"
        onChange={onChangeSearch}
      />
      <Flex>
        <h4>Vis kun biler med prisjustering</h4>
        <Checkbox onChange={handleChange}></Checkbox>
      </Flex>
      <Filter
        onValueChange={onPriceFilterChange}
        headline="Pris"
        minValue={0}
        maxValue={75000}
      ></Filter>
      <Filter
        onValueChange={onYearModelFilterChange}
        headline="Årsmodell"
        minValue={1995}
        maxValue={2021}
      ></Filter>
      <Filter
        onValueChange={onMileageFilterChange}
        headline="Kilometerstand"
        minValue={0}
        maxValue={500000}
      ></Filter>
    </FilterContainer>
  );
};

export default SideBar;
