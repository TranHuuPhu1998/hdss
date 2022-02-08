import { useState } from 'react'

export interface OpenList {
  [key: string]: boolean
}

/**
 * Hook using with list or related components
 * @param defaultValue Default value of open list
 * @param isMultiple allow open multiple
 */
export default function useList (
  defaultValue: OpenList = {},
  isMultiple = true,
): [OpenList, (field: string, value?: boolean) => () => void] {
  const [openList, updateList] = useState<OpenList>(defaultValue)

  /**
   *
   * @param field field name
   * @param value value received, if not set it will toggle
   */
  const handleFactory = (field: string, value?: boolean) => () => {
    const newValue = typeof value === 'undefined' ? !openList[field] : value
    const item = { [field]: newValue }
    return updateList(!isMultiple ? item : { ...openList, ...item })
  }

  return [openList, handleFactory]
}
