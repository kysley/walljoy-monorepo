import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  devices: Array<Device>;
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type Collection = {
  __typename?: 'Collection';
  followers: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  wallpapers: Array<Wallpaper>;
};

export type Device = {
  __typename?: 'Device';
  authorized: Scalars['Boolean'];
  deviceId: Scalars['String'];
  followedCollection?: Maybe<Collection>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  selectWallpaper?: Maybe<Wallpaper>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  followCollection?: Maybe<Device>;
  register: Account;
  registerDevice: Scalars['String'];
  selectWallpaper?: Maybe<Device>;
};


export type MutationCreateAccountArgs = {
  code: Scalars['String'];
  deviceId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationFollowCollectionArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  deviceId: Scalars['String'];
  deviceName: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterDeviceArgs = {
  deviceId: Scalars['String'];
};


export type MutationSelectWallpaperArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Collection>;
  collectionLatest?: Maybe<Wallpaper>;
  currentDevice?: Maybe<Device>;
  devices?: Maybe<Array<Device>>;
  me?: Maybe<Account>;
  wallpaper?: Maybe<Wallpaper>;
  wallpapers?: Maybe<Array<Wallpaper>>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionLatestArgs = {
  id: Scalars['ID'];
};


export type QueryWallpaperArgs = {
  id: Scalars['Int'];
};

export type Wallpaper = {
  __typename?: 'Wallpaper';
  createdAt: Scalars['String'];
  devices: Scalars['Int'];
  id: Scalars['ID'];
  unsplashUrl?: Maybe<Scalars['String']>;
};

export type CreateAccountMutationVariables = Exact<{
  code: Scalars['String'];
  deviceId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', email: string, id: string } };

export type FollowCollectionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FollowCollectionMutation = { __typename?: 'Mutation', followCollection?: { __typename?: 'Device', name?: string | null } | null };

export type SelectWallpaperMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SelectWallpaperMutation = { __typename?: 'Mutation', selectWallpaper?: { __typename?: 'Device', id: string } | null };

export type WallpaperQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WallpaperQuery = { __typename?: 'Query', wallpaper?: { __typename?: 'Wallpaper', id: string, unsplashUrl?: string | null, createdAt: string, devices: number } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', email: string, id: string, devices: Array<{ __typename?: 'Device', id: string, deviceId: string, name?: string | null }> } | null };

export type CollectionLatestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CollectionLatestQuery = { __typename?: 'Query', collectionLatest?: { __typename?: 'Wallpaper', id: string, unsplashUrl?: string | null } | null };

export type CollectionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, followers: number, wallpapers: Array<{ __typename?: 'Wallpaper', unsplashUrl?: string | null, id: string, createdAt: string }> } | null };

export type PartialDeviceFragmentFragment = { __typename?: 'Device', id: string, deviceId: string, name?: string | null };

export type DevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type DevicesQuery = { __typename?: 'Query', devices?: Array<{ __typename?: 'Device', id: string, deviceId: string, name?: string | null, followedCollection?: { __typename?: 'Collection', name: string } | null }> | null };

export type CurrentDeviceQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentDeviceQuery = { __typename?: 'Query', currentDevice?: { __typename?: 'Device', authorized: boolean, id: string, deviceId: string, name?: string | null, followedCollection?: { __typename?: 'Collection', id: string, name: string } | null } | null };

export const PartialDeviceFragmentFragmentDoc = gql`
    fragment PartialDeviceFragment on Device {
  id
  deviceId
  name
}
    `;
export const CreateAccountDocument = gql`
    mutation createAccount($code: String!, $deviceId: String!, $email: String!, $name: String!) {
  createAccount(code: $code, deviceId: $deviceId, email: $email, name: $name) {
    email
    id
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const FollowCollectionDocument = gql`
    mutation followCollection($id: Int!) {
  followCollection(id: $id) {
    name
  }
}
    `;

export function useFollowCollectionMutation() {
  return Urql.useMutation<FollowCollectionMutation, FollowCollectionMutationVariables>(FollowCollectionDocument);
};
export const SelectWallpaperDocument = gql`
    mutation selectWallpaper($id: Int!) {
  selectWallpaper(id: $id) {
    id
  }
}
    `;

export function useSelectWallpaperMutation() {
  return Urql.useMutation<SelectWallpaperMutation, SelectWallpaperMutationVariables>(SelectWallpaperDocument);
};
export const WallpaperDocument = gql`
    query wallpaper($id: Int!) {
  wallpaper(id: $id) {
    id
    unsplashUrl
    createdAt
    devices
  }
}
    `;

export function useWallpaperQuery(options: Omit<Urql.UseQueryArgs<WallpaperQueryVariables>, 'query'>) {
  return Urql.useQuery<WallpaperQuery, WallpaperQueryVariables>({ query: WallpaperDocument, ...options });
};
export const MeDocument = gql`
    query me {
  me {
    email
    id
    devices {
      id
      deviceId
      name
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const CollectionLatestDocument = gql`
    query collectionLatest($id: ID!) {
  collectionLatest(id: $id) {
    id
    unsplashUrl
  }
}
    `;

export function useCollectionLatestQuery(options: Omit<Urql.UseQueryArgs<CollectionLatestQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionLatestQuery, CollectionLatestQueryVariables>({ query: CollectionLatestDocument, ...options });
};
export const CollectionDocument = gql`
    query collection($id: ID!) {
  collection(id: $id) {
    id
    wallpapers {
      unsplashUrl
      id
      createdAt
    }
    name
    followers
  }
}
    `;

export function useCollectionQuery(options: Omit<Urql.UseQueryArgs<CollectionQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionQuery, CollectionQueryVariables>({ query: CollectionDocument, ...options });
};
export const DevicesDocument = gql`
    query devices {
  devices {
    ...PartialDeviceFragment
    followedCollection {
      name
    }
  }
}
    ${PartialDeviceFragmentFragmentDoc}`;

export function useDevicesQuery(options?: Omit<Urql.UseQueryArgs<DevicesQueryVariables>, 'query'>) {
  return Urql.useQuery<DevicesQuery, DevicesQueryVariables>({ query: DevicesDocument, ...options });
};
export const CurrentDeviceDocument = gql`
    query currentDevice {
  currentDevice {
    ...PartialDeviceFragment
    authorized
    followedCollection {
      id
      name
    }
  }
}
    ${PartialDeviceFragmentFragmentDoc}`;

export function useCurrentDeviceQuery(options?: Omit<Urql.UseQueryArgs<CurrentDeviceQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentDeviceQuery, CurrentDeviceQueryVariables>({ query: CurrentDeviceDocument, ...options });
};