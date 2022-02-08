// import RadioSelect from '@hdbank/icons/components/RadioSelect'
// import RadioUnselect from '@hdbank/icons/components/RadioUnselect'

import { RadioStatuses } from './types'

const mapOfIcons = {
  // [RadioStatuses.unchecked]: RadioUnselect,
  [RadioStatuses.unchecked]: null,
  // [RadioStatuses.checked]: RadioSelect,
  [RadioStatuses.checked]: null,
}

export const getIconByStatus = (status: RadioStatuses) => mapOfIcons[status]

export const getStatusOfRadio = (checked: boolean) =>
  !checked ? RadioStatuses.unchecked : RadioStatuses.checked
