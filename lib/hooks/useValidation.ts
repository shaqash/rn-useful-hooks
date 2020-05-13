import * as React from 'react';
import useAdvState from './useAdvState';
import useLoading from './useLoading';

type FormFieldsType = {};
interface ValidationInterface {
  state: FormFieldsType;
  handleChange: (payload: FormFieldsType) => void;
  errors: Array<string>;
  isLoading: boolean;
  handleSubmit: () => void;
  handleBlur: () => void;
  returnInfo: unknown;
  clearValues: () => void;
  clearErrors: () => void;
}

type UnknownPromiseType = Promise<unknown>;

/**
 * Useful hook for validating forms and managing state.
 * @param {State} initial Initial state
 * @param {Function} validate Validation function, returns array of errors
 * @param {Function} onSubmit Submit followup action
 */
export default function useValidation(
  initial: FormFieldsType = {},
  validate: (state: FormFieldsType) => Array<string> = (): Array<string> => [],
  onSubmit: () => UnknownPromiseType,
): ValidationInterface {
  const [state, updateState, setState] = useAdvState(initial);
  const [isLoading, load] = useLoading(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [returnInfo, setReturnInfo] = React.useState<unknown>();

  /**
   * Checks for errors onBlur
   */
  const handleBlur = (): void => {
    setErrors(validate(state));
  };

  const handler = React.useCallback(
    async () => {
      try {
        const res = await load(onSubmit);
        setReturnInfo(res);
      } catch (err) {
        setErrors([err]);
      }
    }, [onSubmit, load],
  );

  React.useEffect(() => {
    const noErrors = errors.length === 0;
    if (noErrors) {
      if (isSubmitting) {
        handler().finally(() => setSubmitting(false));
      } else {
        setSubmitting(false);
      }
    } else {
      setSubmitting(false);
    }
  }, [errors, isSubmitting, handler, load, onSubmit]);

  /**
   * Checks for errors and runs onSubmit
   */
  const handleSubmit = (): void => {
    setSubmitting(true);
    setErrors(validate(state));
  };

  /**
   * Clears errors array
   */
  const clearErrors = (): void => {
    setErrors([]);
  };

  /**
   * Resets state to initial
   */
  const clearValues = (): void => {
    setState(initial);
    clearErrors();
  };

  return {
    state,
    handleChange: updateState,
    errors,
    isLoading,
    handleSubmit,
    handleBlur,
    returnInfo,
    clearValues,
    clearErrors,
  };
}
