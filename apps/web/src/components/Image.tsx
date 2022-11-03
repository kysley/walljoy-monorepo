import {styled} from '@stitches/react';
import React, {useRef, useState} from 'react';

import {useIntersection} from '../hooks/useIntersectionObserver';

export const LazyImage = ({url}: {url: string}) => {
  return <Image loading="lazy" src={url} alt="" />;
};

export const Image = styled('img', {
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  // display: 'block',
  cursor: 'zoom-in',
  touchAction: 'none',
  position: 'relative',
  willChange: 'transform',

  '&:hover': {
    border: '1px solid blue',
  },
});
