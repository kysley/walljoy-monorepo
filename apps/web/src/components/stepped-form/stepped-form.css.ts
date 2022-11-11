import {style} from '@vanilla-extract/css';
import {vars} from '../system/theme/global-theme.css';

export const stepsWrapperStyles = style({
  display: 'flex',
  flexDirection: 'column',
});

export const stepsContainerStyles = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // padding: '2em',
  width: '100%',
  // borderRadius: '5px',
  // border: `1px solid ${vars.colors.neutral['neutral-500']}`,
});

export const actionsContainerStyles = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '7rem',
  padding: vars.spacing.medium,
  backgroundColor: vars.colors.neutral['neutral-800'],
  borderRadius: vars.radii.small,
});

export const stepContainerStyles = style({
  display: 'flex',
  // flexDirection: 'column',
});
