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
  id: Scalars['ID'];
  name: Scalars['String'];
  wallpapers: Array<Wallpaper>;
};

export type Device = {
  __typename?: 'Device';
  activeCollectionId?: Maybe<Scalars['Int']>;
  authorized: Scalars['Boolean'];
  deviceId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  register: Account;
  registerDevice: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  code: Scalars['String'];
  deviceId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationRegisterArgs = {
  deviceId: Scalars['String'];
  deviceName: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterDeviceArgs = {
  deviceId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  me: Account;
  wallpapers?: Maybe<Array<Wallpaper>>;
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type Wallpaper = {
  __typename?: 'Wallpaper';
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Account', email: string, id: string } };


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
export const MeDocument = gql`
    query me {
  me {
    email
    id
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};