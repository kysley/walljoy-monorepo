import {createGlobalTheme, globalStyle} from '@vanilla-extract/css';
import * as tokens from './tokens';

export const vars = createGlobalTheme(':root', {
  ...tokens,
});

console.log(vars);

globalStyle('html, body', {
  color: '#fff',
  background: '#000',
  lineHeight: 'initial',
});
