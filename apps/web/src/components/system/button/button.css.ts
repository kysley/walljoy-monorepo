import {style} from '@vanilla-extract/css';
import {vars} from '../theme/global-theme.css';

export const button = style({
  padding: vars.spacing.medium,
  ':hover': {
    //...
  },
  color: vars.colors.blue['blue-300'],
});
