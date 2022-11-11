import {Suspense, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMeQuery} from '../graphql/gen';
import {useCurrentDevice} from '../hooks/useCurrentDevice';

export const SessionGate = ({
  children,
  required = false,
  to,
}: {
  required?: boolean;
  children: JSX.Element;
  to?: string;
}): JSX.Element => {
  const [res] = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (required && !res?.data?.me) {
      navigate({pathname: '/'});
    } else if (res.data?.me && to) {
      navigate(to, {replace: true});
    }
  }, [res.fetching, res.data, required, to, navigate]);

  return <Suspense fallback={'Loading...'}>{children}</Suspense>;
};
