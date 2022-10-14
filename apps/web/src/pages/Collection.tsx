// import React from 'react';
// import {useParams} from 'react-router';
// import {WallpaperCard} from '../components/WallpaperCard';

// import {useCollectionQuery} from '../graphql/gen';

// export const Collection = () => {
//   const {collection} = useParams();
//   const [res] = useCollectionQuery({
//     variables: isNaN(Number(collection))
//       ? {name: collection}
//       : {id: Number(collection)},
//   });

//   if (!collection) {
//     return <span>collection!?</span>;
//   }

//   if (res.error) {
//     return <span>something went wrong</span>;
//   }

//   return (
//     <>
//       <h1>{res.data?.collection?.name}</h1>
//       {res.data?.collection?.wallpapers.map((wp) => (
//         <WallpaperCard key={wp.id} wallpaper={wp} standalone />
//       ))}
//     </>
//   );
// };
