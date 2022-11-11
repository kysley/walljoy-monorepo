import {Fragment, ReactNode, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

// import logoReference from '/Smile_Dark.svg';

import {
  // useAuthenticateSessionMutation,
  // useRegisterMutation,
  useCreateAccountMutation,
  useDeviceStatusQuery,
} from '../graphql/gen';
import {Stack} from '../components/system';
import {Page} from '../components/page';
import {Steps} from '../components/stepped-form';
import {SessionGate} from '../components/session-gate';

export const Register = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: params.get('name'),
      deviceId: params.get('deviceId'),
      code: params.get('code'),
      email: '',
    },
  });

  const [res] = useDeviceStatusQuery({
    variables: {
      code: params.get('code'),
      deviceId: params.get('deviceId'),
    },
  });

  const [dat, mut] = useCreateAccountMutation();

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    mut(data, {suspense: true});
  };

  useEffect(() => {
    if (!res.fetching && res.data?.deviceStatus) {
      console.log('authenticate user');
      navigate({pathname: '/authenticate', search: location.search});
    }
  }, [location, navigate, res]);

  return (
    <SessionGate to="/">
      <Page title="Let's get started">
        <Stack>
          <Steps onSubmit={handleSubmit(handleFormSubmit)} steps={3}>
            {({currentStep}) => (
              <Stack
                space="large"
                style={{justifyContent: 'flex-start', display: 'flex'}}
              >
                {currentStep === 1 && (
                  <Fragment>
                    <h2>What do you call this device?</h2>
                    <input
                      {...register('name')}
                      placeholder={params.get('name') || undefined}
                    />
                  </Fragment>
                )}
                {currentStep === 2 && (
                  <Stack space="medium">
                    <div>
                      <h2>What's your email?</h2>
                      <p>
                        We use this to connect multiple devices to your account.
                      </p>
                    </div>
                    <input
                      {...register('email')}
                      placeholder={params.get('email') || undefined}
                    />
                  </Stack>
                )}
              </Stack>
            )}
          </Steps>
        </Stack>
      </Page>
    </SessionGate>
  );
};

const Step = ({
  children,
  nextStep,
  prevStep,
  isFinalStep = false,
  finalStepText,
  currentStep,
}: {
  children: ReactNode;
  nextStep(): void;
  prevStep(): void;
  isFinalStep?: Boolean;
  finalStepText?: string;
  currentStep: boolean;
}) => {
  if (!currentStep) {
    return null;
  }
  return (
    <div>
      {children}
      {isFinalStep ? (
        <button type="submit">{finalStepText}</button>
      ) : (
        <button onClick={nextStep}>continue</button>
      )}
      <button onClick={prevStep}>go back</button>
    </div>
  );
};
