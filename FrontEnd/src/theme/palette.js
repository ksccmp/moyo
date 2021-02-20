import { colors } from '@material-ui/core';
import moyocolor from '../api/moyoColor';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    main: moyocolor.moyo_green_1,
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: moyocolor.moyo_biscay_2,
    light: colors.blue['A400'],
  },
  success: {
    contrastText: white,
    main: moyocolor.moyo_green_3,
  },
  info: {
    contrastText: white,
    main: moyocolor.moyo_blue_3,
  },
  warning: {
    contrastText: black,
    main: colors.yellow[600],
  },
  error: {
    contrastText: white,
    main: colors.red[600],
  },
  text: {
    primary: black,
    secondary: moyocolor.moyo_green_3,
    link: black,
  },
  background: {
    default: '#f2f5f8',
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
