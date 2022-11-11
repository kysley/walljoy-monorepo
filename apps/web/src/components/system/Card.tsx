import {style} from '@vanilla-extract/css';
import * as React from 'react';
import {CSSFunctionArgs} from 'system-props';
import {vars} from './theme/global-theme.css';
import {Sprinkles, system} from './theme/sprinkles.css';
import {css} from './theme/system-props';
import {ThemeContext} from './theme/theme-provider';

type CardProps = {
  /**
   * Defines the space inside of the card.
   */
  space?: Sprinkles['padding'];
  /**
   * Sets the horizontal alignment of the items.
   */
  align?: Sprinkles['alignItems'];
  /**
   * The items to lay out in the stack.
   */
  children: React.ReactNode;
  /**
   * The direction the Stack spreads the elements
   */
  direction?: 'column' | 'row';

  sx?: Sprinkles;
};

export function Card({
  space = 'medium',
  align = 'stretch',
  direction = 'column',
  children,
  sx,
  ...rest
}: CardProps) {
  const theme = React.useContext(ThemeContext);
  const className = system({
    display: 'flex',
    flexDirection: direction,
    padding: space,
    alignItems: align,
    borderRadius: 'medium',
    borderColor: 'zinc-600',
    borderStyle: 'solid',
    borderWidth: 'standard',

    // since this returns a css object (with injected properties) there really is no difference between
    // this and keeping `sx` but not passing it through `css`
    // ...sx,
  });

  return React.createElement('div', {className, ...rest}, children);
}

// const styles = style({
//   ':-moz-any-link': {
//     accentColor: '-moz-initial',
//   },
// });
