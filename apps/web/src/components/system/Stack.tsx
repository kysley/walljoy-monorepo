import * as React from 'react';
import {Sprinkles, system} from './theme/sprinkles.css';

type StackProps = {
  /**
   * The element used for the root node.
   */
  as?: 'div' | 'span' | 'ol' | 'ul';
  /**
   * Defines the spacing between the items.
   */
  space?: Sprinkles['gap'];
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
};

export function Stack({
  as = 'div',
  space = 'none',
  align = 'stretch',
  direction = 'column',
  children,
}: StackProps) {
  const className = system({
    display: 'flex',
    flexDirection: direction,
    gap: space,
    alignItems: align,
  });

  return React.createElement(as, {className}, children);
}
