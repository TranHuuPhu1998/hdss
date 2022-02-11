import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import usePortal from '../../../hooks/usePortal';
import checkIsBrowser from '../../../utils/checkIsBrowser';

export enum PortalIds {
  popover = 'sds-popover',
  dialog = 'sds-dialog',
  toast = 'sds-toast',
  tooltip = 'sds-popper',
}

export type PortalProps = React.PropsWithChildren<{
  /**
   * Set `id` of element will append to document
   */
  id: PortalIds | string;
}>;

const Portal: FC<PortalProps> = ({ id, children }: PortalProps) => {
  const isBrowser = checkIsBrowser();
  if (!isBrowser) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const element = usePortal(id);
  return createPortal(children, element);
};

export default Portal;
