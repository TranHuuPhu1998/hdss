import Checked from 'icons/Checked';
import MultiChecked from 'icons/MultiChecked';
import Uncheck from 'icons/Uncheck';

import { CheckboxStatuses } from './types';

const mapOfIcons = {
  [CheckboxStatuses.unchecked]: Uncheck,
  [CheckboxStatuses.checked]: Checked,
  [CheckboxStatuses.intermediate]: MultiChecked,
};

export const getIconByStatus = (status: CheckboxStatuses) => mapOfIcons[status];

export const getStatusOfCheckbox = (
  isChecked: boolean,
  isIntermediate: boolean,
) =>
  (!isChecked && CheckboxStatuses.unchecked) ||
  (isIntermediate ? CheckboxStatuses.intermediate : CheckboxStatuses.checked);
