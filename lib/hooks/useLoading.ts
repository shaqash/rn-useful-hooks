import * as React from 'react';

type UnknownPromiseType = Promise<unknown>;
type HookType = [
  boolean,
  (aPromise: () => UnknownPromiseType) => UnknownPromiseType
]

export default function useLoading(initial: boolean): HookType {
  const [isLoading, setLoading] = React.useState(initial);

  /**
 * Set loading animation before calling an async function
 * @param {Promise} aPromise Async callback
 */
  const load = async (aPromise: () => UnknownPromiseType): UnknownPromiseType => {
    setLoading(true);
    return aPromise().finally(() => setLoading(false));
  };

  return [isLoading, load];
}
