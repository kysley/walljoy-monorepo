import {ReactNode, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  stepsWrapperStyles,
  stepsContainerStyles,
  actionsContainerStyles,
} from './stepped-form.css';
import {Stack} from '../system';
import {
  DeepPartial,
  FieldValues,
  useForm,
  useFormContext,
} from 'react-hook-form';

// export const Step = ({
//   children,
//   currentStep,
// }: {
//   children: ReactNode;
//   currentStep: boolean;
// }) => {
//   if (!currentStep) {
//     return null;
//   }
//   return <div>{children}</div>;
// };

export const Steps = ({
  onSubmit,
  steps,
  children,
}: {
  onSubmit: (values: any) => void;
  steps: number;
  children({currentStep}: {currentStep: number}): ReactNode;
}) => {
  const [step, setStep] = useState(1);

  return (
    <div className={stepsWrapperStyles}>
      <div className={stepsContainerStyles}>
        <form onSubmit={onSubmit}>{children({currentStep: step})}</form>
      </div>
      <div className={actionsContainerStyles}>
        <button onClick={() => {}}>Cancel</button>
        <Stack space="medium" direction="row">
          {step > 1 && (
            <button onClick={(_) => setStep((p) => p - 1)}>Back</button>
          )}
          {step === steps ? (
            <button type="submit">Submit</button>
          ) : (
            <button onClick={(_) => setStep((p) => p + 1)}>Next</button>
          )}
        </Stack>
      </div>
    </div>
  );
};
