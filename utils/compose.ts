import warning from 'warning';

// tslint:disable-next-line: no-empty
const nope = () => {};

export default function createChainedFunction<T = (...rest: any[]) => void>(
  ...funcs
): T {
  return funcs.filter(Boolean).reduce((acc, func) => {
    warning(
      typeof func === 'function',
      'invalid Argument Type, must only provide functions, undefined, or null.'
    );

    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, nope);
}
