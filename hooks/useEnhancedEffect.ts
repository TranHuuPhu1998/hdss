import { useEffect, useLayoutEffect } from 'react';
import checkIsBrowser from '../utils/checkIsBrowser';

const isBrowser = checkIsBrowser();
const useEnhancedEffect = isBrowser ? useLayoutEffect : useEffect;

export default useEnhancedEffect;
