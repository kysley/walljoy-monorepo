// import React from 'react';
// import {useParams} from 'react-router';
// import {WallpaperCard} from '../components/WallpaperCard';

import {useParams} from 'react-router-dom';
import {Page} from '../components/page';
import {WallpaperCard} from '../components/WallpaperCard';
import {useWallpaperQuery} from '../graphql/gen';

export const Wallpaper = () => {
  const {id} = useParams();
  const [res] = useWallpaperQuery({
    variables: {
      id: +id,
    },
  });

  if (res.error) {
    return <span>Something went wrong getting this wallpaper</span>;
  }

  if (res.fetching) {
    return <span>loading...</span>;
  }

  return (
    <Page>
      <WallpaperCard wallpaper={res.data?.wallpaper} standalone />
    </Page>
  );
};
