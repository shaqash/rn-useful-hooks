import { useReducer } from 'react';

type Action =
| { type: 'ADD'; payload: StateType }
| { type: 'SET'; payload: StateType }
| { type: 'CLEAR' };
export type StateType = {};
export type StateReturnType = [
  StateType,
  (payload: StateType) => void,
  (payload: StateType) => void,
  () => void,
]

export function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET':
      return {
        ...action.payload,
      };
    case 'CLEAR':
      return {};
    default:
      return state;
  }
}

export default function useAdvState(initial: StateType): StateReturnType {
  const [state, dispatch] = useReducer<React.Reducer<StateType, Action>>(reducer, initial);

  /**
   * Adds to the state
   * @param {*} payload Object containing changes to the current state
   */
  const updateState = (payload: StateType): void => {
    dispatch({ type: 'ADD', payload });
  };

  /**
   * Sets new state
   * @param {*} payload Object with the new state
   */
  const setState = (payload: StateType): void => {
    dispatch({ type: 'SET', payload });
  };

  /**
   * Empty the state
   */
  const clearState = (): void => {
    dispatch({ type: 'CLEAR' });
  };

  return [state, updateState, setState, clearState];
}
