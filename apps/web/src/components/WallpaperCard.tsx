import {styled} from '@stitches/react';
import React from 'react';
import {Link} from 'react-router-dom';
import {CgArrowLongRight} from 'react-icons/cg';
import {when} from 'whendys';

import type {Wallpaper} from '../graphql/gen';
import {PanZoom} from './ZoomPan';
import {Stack} from './Stack';

export const WallpaperCard = ({
  wallpaper,
  standalone,
}: {
  wallpaper: Wallpaper;
  standalone: boolean;
}) => {
  const {id, createdAt, u_url, collection} = wallpaper;

  return (
    <Container>
      <LinkContainer direction="row">
        <Link to={`w/${id}`}>
          <span style={{color: 'green'}}>{when(createdAt)}</span>
        </Link>
        {!standalone && (
          <>
            <CgArrowLongRight size="42px" />
            {collection.map((collection) => (
              <Link
                key={collection.id}
                to={`c/${collection?.id}`}
                state={{back: window.location.pathname}}
              >
                {collection?.name}
              </Link>
            ))}
          </>
        )}
      </LinkContainer>
      <PanZoom source={u_url} alt="" />
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
