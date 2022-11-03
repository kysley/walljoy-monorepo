import {styled} from '@stitches/react';
import React from 'react';
import {Link} from 'react-router-dom';
import {CgArrowLongRight} from 'react-icons/cg';
import {when} from 'whendys';

import type {Wallpaper} from '../graphql/gen';
import {PanZoom} from './ZoomPan';
import {Stack} from './system';

export const WallpaperCard = ({
  wallpaper,
  standalone,
}: {
  wallpaper: Wallpaper;
  standalone: boolean;
}) => {
  const {id, unsplashUrl} = wallpaper;

  return (
    <Container>
      <LinkContainer direction="row">
        <Link to={`w/${id}`}>
          <span style={{color: 'green'}}>{when(wallpaper.createdAt)}</span>
          {/* <span style={{color: 'green'}}>some time ago</span> */}
          <span>on {wallpaper.devices} screens</span>
        </Link>
        {!standalone && (
          <>
            <CgArrowLongRight size="42px" />
            {/* {collection.map((collection) => (
              <Link
                key={collection.id}
                to={`c/${collection?.id}`}
                state={{back: window.location.pathname}}
              >
                {collection?.name}
              </Link>
            ))} */}
          </>
        )}
      </LinkContainer>
      <PanZoom source={`/img/${unsplashUrl}.jpg`} />
    </Container>
  );
};

const Container = styled('div', {
  display: 'grid',
  gridTemplateRows: '33px 1fr',
  position: 'relative',
});

const LinkContainer = styled(Stack, {
  alignItems: 'center',
});
