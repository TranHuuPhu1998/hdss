import { KeyboardEvent, useCallback } from 'react';

type Fn = (event: KeyboardEvent) => void;

function useEnterOnKeydown(fn: Fn) {
  const handle = useCallback(
    (e: KeyboardEvent) => {
      const isEnter = (e.which || e.keyCode) === 13;
      if (isEnter) {
        fn(e);
      }
    },
    [fn]
  );

  return handle;
}

export default useEnterOnKeydown;
