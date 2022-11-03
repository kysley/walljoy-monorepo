import React, {Fragment, ReactNode, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useGesture} from 'react-use-gesture';
import {useSpring, animated, to} from 'react-spring';

import {useLockBodyScroll} from '../hooks';
import {LazyImage} from './Image';
import {CgClose, CgCloseO, CgCloseR} from 'react-icons/cg';

export const Portal = ({children}: {children: ReactNode}) => {
  const mount = document.getElementById('portal-root');
  const el = document.createElement('div');

  useEffect(() => {
    mount!.appendChild(el);
    return () => {
      mount!.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};

export const ScrollLock = ({children}: {children: ReactNode}) => {
  useLockBodyScroll();
  return <Fragment>{children}</Fragment>;
};

const PanZoomModal = ({close, $src}: {close(): void; $src: string}) => {
  const portalImageRef = useRef(null);

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    const keydown = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);
    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('keydown', keydown);
    };
  }, []);

  const [{x, y, zoom, scale}, api] = useSpring(() => ({
    zoom: 0,
    scale: 1,
    x: 0,
    y: 0,
    config: {mass: 1, tension: 1000, friction: 80, bounce: 0.05},
  }));

  useGesture(
    {
      onDrag: ({offset: [x, y]}) => api({x, y}),
      onWheel: ({event, offset: [, y]}) => {
        event.preventDefault();
        api({zoom: -y / 1050});
      },
    },
    {domTarget: portalImageRef, eventOptions: {passive: false}},
  );

  return (
    <Portal>
      <ScrollLock>
        <div
          onClick={close}
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            background: 'rgba(0,0,0,0.2)',
            zIndex: 999,
            top: 0,
            left: 0,
          }}
        >
          <animated.div
            onClick={(e) => e.stopPropagation()}
            ref={portalImageRef}
            style={{
              x,
              y,
              zoom,
              scale: to([scale, zoom], (s, z) => s + z),
              backgroundImage: `url(${$src})`,
              height: '100%',
              width: '100%',
              cursor: 'grab',
              display: 'flex',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                margin: '1rem',
              }}
            >
              <CgClose size={24} style={{}} onClick={close} />
              <span>esc</span>
            </div>
          </animated.div>
        </div>
      </ScrollLock>
    </Portal>
  );
};

export const PanZoom = ({source}: {source: string}) => {
  const [expanded, setExpanded] = useState(false);

  const handleImageClick = () => {
    setExpanded(true);
  };

  return (
    <>
      <div onClick={handleImageClick}>
        <LazyImage url={source} />
      </div>
      {expanded && (
        <PanZoomModal close={() => setExpanded(false)} $src={source} />
      )}
    </>
  );
};
