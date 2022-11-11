import {createClient, dedupExchange, cacheExchange, fetchExchange} from 'urql';
import {authExchange} from '@urql/exchange-auth';
import {makeOperation} from '@urql/core';

const clientUrl =
  import.meta.env.mode === 'PRODUCTION'
    ? 'FILLME'
    : 'http://localhost:6678/graphql';

export const urqlClient = createClient({
  url: clientUrl,
  fetchOptions: {
    credentials: 'include',
  },
  suspense: true,
  // fetchOptions: () => {
  // 	const token = localStorage.getItem("token");
  // 	if (!token) {
  // 		return {};
  // 	}
  // 	return {
  // 		headers: {
  // 			authorization: `Bearer ${token}`,
  // 		},
  // 	};
  // },
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation: ({authState, operation}) => {
        if (!authState || !authState.token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            headers: {
              ...fetchOptions.headers,
              // Authorization: authState.token,
            },
          },
        });
      },
      willAuthError: ({authState}) => {
        if (!authState) return true;
        // e.g. check for expiration, existence of auth etc
        return false;
      },
      didAuthError: ({error}) => {
        // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
        console.log(
          error,
          error.graphQLErrors.some((e) =>
            e.message.toLowerCase().includes('expired'),
          ),
        );
        return error.graphQLErrors.some((e) =>
          e.message.toLowerCase().includes('expired'),
        );
      },
      getAuth: async ({authState, mutate}) => {
        if (!authState) {
          const token = localStorage.getItem('token');
          const refreshToken = localStorage.getItem('refreshToken');
          if (token && refreshToken) {
            return {token, refreshToken};
          }
          return null;
        }

        const result = await mutate(
          `mutation RefreshCredentials($refreshToken: String!) {
  refreshCredentials(refreshToken: $refreshToken) {
    token
    refreshToken
  }
}`,
          {
            refreshToken: authState!.refreshToken,
          },
        );

        if (result?.data.refreshCredentials) {
          const {token, refreshToken} = result?.data.refreshCredentials;
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          return {
            token: token,
            refreshToken: refreshToken,
          };
        }
        localStorage.clear();
        return null;
      },
    }),
    fetchExchange,
  ],
});

export const saveTokens = (token: string, refreshToken: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};
