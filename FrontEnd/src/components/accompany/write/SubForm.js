import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from '@material-ui/core';
import styled from 'styled-components';

const MenuTypo = styled(Typography)`
  text-align: left;
  font-weight: 700 !important;
  font-size: 0.9rem !important;
  margin-top: 0.7rem !important;
  margin-bottom: 0.3rem !important;
`;

const CustomRadioGroup = styled(RadioGroup)`
  & > label {
    margin-right: 0.5rem;
    & > span {
      font-size: 0.85rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      padding-right: 0.5rem;
      & > span > div > svg {
        width: 1.4rem;
      }
    }
  }
`;

const CustomFormGroup = styled(FormGroup)`
  & > label {
    margin-right: 0.5rem;
    & > span {
      font-size: 0.85rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      padding-right: 0.5rem;
      & > span > svg {
        width: 1.4rem;
      }
    }
  }
`;

const SubForm = ({ ...props }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <MenuTypo>원하는 성별</MenuTypo>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <CustomRadioGroup
            name="gender"
            value={props.gender}
            onChange={props.onGenderChange}
            row
          >
            {props.genderList.map(item => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </CustomRadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <MenuTypo>원하는 나이대</MenuTypo>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <CustomFormGroup row>
            {props.ageList.map(item => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Checkbox
                    checked={props.onAgeChecked(item.value)}
                    onChange={props.onAgeChange}
                    value={item.value}
                  />
                }
                label={item.name}
              />
            ))}
          </CustomFormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <MenuTypo>대표 여행 타입</MenuTypo>
      </Grid>
      <FormControl fullWidth>
        <CustomRadioGroup
          name="ttypeId"
          value={props.type}
          onChange={props.onTypeChange}
          row
        >
          {props.typeList.map(item => (
            <FormControlLabel
              key={item.ttypeId}
              value={item.ttypeId}
              control={<Radio />}
              label={item.name}
            />
          ))}
        </CustomRadioGroup>
      </FormControl>
    </Grid>
  );
};

export default SubForm;
