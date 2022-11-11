import {useForm} from 'react-hook-form';
import {useParams, useSearchParams} from 'react-router-dom';
import {Page} from '../components/page';
import {SessionGate} from '../components/session-gate';
import {useAuthenticateMutation} from '../graphql/gen';

export const Authenticate = () => {
  const [params] = useSearchParams();
  const {register, handleSubmit} = useForm({
    defaultValues: {
      email: '',
    },
  });
  const [dat, mut] = useAuthenticateMutation();

  const submit = (data) => {
    mut({
      email: data.email,
      code: params.get('code'),
      deviceId: params.get('deviceId'),
    });
  };

  return (
    <SessionGate to="/">
      <Page title=":wave:">
        <form onSubmit={handleSubmit(submit)}>
          Welcome back, whats your email?
          <input {...register('email', {required: true})} />
          <button type="submit">submit</button>
        </form>
      </Page>
    </SessionGate>
  );
};
