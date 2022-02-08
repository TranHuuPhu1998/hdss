import { useCallback, useState } from 'react'

export default function useInputTyping (defaultValue) {
  const [value, updateValue] = useState(defaultValue)

  const handleOnChange = useCallback((e) => {
    updateValue(e.target.value)
  }, [])

  return [value, handleOnChange]
}
