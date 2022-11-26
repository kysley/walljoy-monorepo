import {styled} from '@stitches/react';
import React, {useRef, useState} from 'react';

import {useIntersection} from '../hooks/useIntersectionObserver';
import {vars} from './system/theme/global-theme.css';

export const LazyImage = ({url}: {url: string}) => {
  return <Image loading="lazy" src={url} alt="" />;
};

export const Image = styled('img', {
  width: '100%',
  // maxWidth: '100%',
  height: '25em',
  // display: 'block',
  cursor: 'zoom-in',
  touchAction: 'none',
  position: 'relative',
  willChange: 'transform',
  transition: 'all .12s ease-out',

  '&:hover': {
    transform: 'translateY(-2px)',
  },
});
