import {style} from '@vanilla-extract/css';
import {vars} from '../system/theme/global-theme.css';

export const titleStyles = style({
  fontSize: vars.typography.jumbo,
  marginBottom: '5vmin',
});

export const pageStyles = style({
  // backgroundColor: vars.colors.neutral['neutral-900'],
  borderRadius: vars.radii.small,
  padding: vars.spacing.large,
  justifySelf: 'flex-start',
  marginLeft: vars.spacing.small,
  // marginLeft: vars.spacing.small,
  // marginRight: vars.spacing.small,
});
