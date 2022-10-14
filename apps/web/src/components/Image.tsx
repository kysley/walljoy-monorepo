import {styled} from '@stitches/react';
import React, {useRef, useState} from 'react';

import {useIntersection} from '../hooks/useIntersectionObserver';

export const LazyImage = ({url}) => {
  const [inView, setinView] = useState(false);
  const imgRef = useRef(null);
  useIntersection(imgRef, () => {
    setinView(true);
  });

  return (
    <div ref={imgRef}>{inView ? <Image src={url} /> : <Image src="" />}</div>
  );
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
