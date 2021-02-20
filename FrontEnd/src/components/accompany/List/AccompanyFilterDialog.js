import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const FilterFormLabel = styled(FormLabel)`
  font-size: 1.1rem !important;
  color: black !important;
  font-weight: 700 !important;
`;

const FilterFormControl = styled(FormControl)`
  & + & {
    margin-top: 1rem;
  }
`;

const AccompanyFilterDialog = ({
  filterGender,
  filterAge,
  filterType,
  onGenderChange,
  onAgeChange,
  onTypeChange,
  open,
  handleClose,
  handleSubmit,
}) => {
  const getAgeLabel = age => age + '대' + (age === '50' ? '+' : '');
  return (
    <Dialog open={open} maxWidth="lg" fullWidth onClose={handleClose}>
      <DialogTitle>필터링</DialogTitle>
      <DialogContent>
        <FilterFormControl fullWidth>
          <FilterFormLabel>성별</FilterFormLabel>
          <RadioGroup
            name="gender"
            value={filterGender}
            onChange={onGenderChange}
            row
          >
            <FormControlLabel value="N" control={<Radio />} label="무관" />
            <FormControlLabel value="M" control={<Radio />} label="남성" />
            <FormControlLabel value="F" control={<Radio />} label="여성" />
          </RadioGroup>
        </FilterFormControl>

        <FilterFormControl fullWidth>
          <FilterFormLabel>나이</FilterFormLabel>
          <FormGroup row>
            {Object.keys(filterAge).map(age => (
              <FormControlLabel
                key={age}
                value={age}
                control={
                  <Checkbox
                    checked={filterAge[{ age }.age]}
                    onChange={onAgeChange({ age })}
                    value={age}
                  />
                }
                label={getAgeLabel(`${age}`)}
              />
            ))}
          </FormGroup>
        </FilterFormControl>

        <FilterFormControl fullWidth>
          <FilterFormLabel>여행타입</FilterFormLabel>
          <FormGroup row>
            {Object.keys(filterType).map(type => (
              <FormControlLabel
                key={type}
                value={type}
                control={
                  <Checkbox
                    checked={filterType[{ type }.type]}
                    onChange={onTypeChange({ type })}
                    value={type}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </FilterFormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          적용
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccompanyFilterDialog;
