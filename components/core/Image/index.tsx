import React, { EventHandler, SyntheticEvent, useEffect } from 'react';
import useImageFallback from '../../../hooks/useImageFallback';
import compose from '../../../utils/compose';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import ImageBase, { ImageBaseType } from '../ImageBase';

interface ImageTypeMap<P = {}, D extends React.ElementType = ImageBaseType> {
  props: P & {
    /**
     * Fallback image src, src will auto replaced by fallback src if error
     */
    fallback?: string;
  };
  defaultComponent: D;
}

type ImageProps<
  D extends React.ElementType = ImageTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ImageTypeMap<P, D>, D>;

export const Image: BaseComponent<ImageTypeMap> & {
  displayName?: string;
} = (props: ImageProps) => {
  const { fallback, src, alt = 'HDBank Việt Nam', onError, ...rest } = props;

  const [sourceOfImage, onFallback] = useImageFallback(src, fallback);

  useEffect(() => {
    const isMissingSource = !src;
    const isDiffFallback = sourceOfImage !== fallback;
    const shouldCallFallback = isMissingSource && isDiffFallback;
    if (shouldCallFallback) {
      onFallback();
    }
  }, [src, sourceOfImage, fallback, onFallback]);

  const handleOnError = compose<EventHandler<SyntheticEvent>>(
    onFallback,
    onError
  );

  return (
    <ImageBase
      {...rest}
      alt={alt}
      src={sourceOfImage}
      onError={handleOnError}
    />
  );
};

Image.displayName = 'Image';

export default Image;
