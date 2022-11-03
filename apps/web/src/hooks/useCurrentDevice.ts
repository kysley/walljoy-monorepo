import {useEffect} from 'react';
import {useCurrentDeviceQuery} from '../graphql/gen';

export function useCurrentDevice() {
  const [req, refetch] = useCurrentDeviceQuery();

  return {...req, refetch};
}
