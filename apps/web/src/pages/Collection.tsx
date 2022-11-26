import React from 'react';
import {useParams} from 'react-router';
import {Page} from '../components/page';
import {WallpaperCard} from '../components/WallpaperCard';

import {useCollectionQuery, useFollowCollectionMutation} from '../graphql/gen';
import {useCurrentDevice} from '../hooks/useCurrentDevice';

export const Collection = () => {
  const {id} = useParams();
  const [res] = useCollectionQuery({
    variables: {id},
    pause: !id,
  });
  const [data, mut] = useFollowCollectionMutation();
  const {data: device} = useCurrentDevice();

  const isDeviceFollowing =
    device?.currentDevice?.following?.id === res.data?.collection?.id;

  if (!id) {
    return <span>no collection id</span>;
  }

  if (res.error) {
    return <span>something went wrong</span>;
  }

  return (
    <Page title={res.data?.collection?.name || 'Loading'}>
      <button onClick={(_) => mut({id: +id})} disabled={isDeviceFollowing}>
        {isDeviceFollowing ? 'following' : 'follow'}
      </button>
      {res.data?.collection?.wallpapers.map((wp) => (
        <WallpaperCard key={wp.id} wallpaper={wp.wallpaper} standalone />
      ))}
    </Page>
  );
};

// const CollectionHeader =
