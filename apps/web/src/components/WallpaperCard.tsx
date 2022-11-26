import {styled} from '@stitches/react';
import React from 'react';
import {Link} from 'react-router-dom';
import {CgArrowLongRight} from 'react-icons/cg';
import {when} from 'whendys';

import {useSelectWallpaperMutation, Wallpaper} from '../graphql/gen';
import {PanZoom} from './ZoomPan';
import {Stack} from './system';
import {vars} from './system/theme/global-theme.css';
import {useCurrentDevice} from '../hooks/useCurrentDevice';

export const WallpaperCard = ({
  wallpaper,
  showMoreInfo,
}: {
  wallpaper: Wallpaper;
  showMoreInfo: boolean;
}) => {
  const {id, unsplashUrl} = wallpaper;
  const [dat, mut] = useSelectWallpaperMutation();
  const {data} = useCurrentDevice();

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" space="medium">
          <Link to={`/wallpaper/${id}`}>
            <span style={{color: vars.colors.zinc['zinc-200']}}>
              {when(new Date(wallpaper.createdAt))}
            </span>
            {/* <span style={{color: 'green'}}>some time ago</span> */}
          </Link>
          {data?.currentDevice?.authorized && (
            <button type="button" onClick={() => mut({id: +wallpaper.id})}>
              set wallpaper
            </button>
          )}
        </Stack>
        {showMoreInfo && (
          <>
            <CgArrowLongRight size="42px" />
            <span>in {wallpaper.collectionCount} collection</span>
          </>
        )}
      </div>
      <PanZoom source={unsplashUrl} />
    </Container>
  );
};

const Container = styled('div', {
  display: 'grid',
  gridTemplateRows: '33px 1fr',
  position: 'relative',
});
