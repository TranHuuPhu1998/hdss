import { SyntheticEvent, useCallback, useState } from 'react';

export default function useCheckbox(defaultValue, valuesOfOptions?: string[]) {
  const [selected, updateSelected] = useState<string[]>(defaultValue || []);

  const onChange = useCallback(
    (event: SyntheticEvent) => {
      const { value } = event.target || ({} as any);
      const isExisted = selected.includes(value);
      const result = isExisted
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      updateSelected(result);
    },
    [selected, updateSelected]
  );
  const selectAll = useCallback(
    () => updateSelected(valuesOfOptions),
    [valuesOfOptions, updateSelected]
  );
  const unselectAll = useCallback(() => updateSelected([]), [updateSelected]);
  const isIntermediate = selected.length < valuesOfOptions.length;

  return {
    selected,
    onChange,
    isIntermediate,
    selectAll,
    unselectAll,
  };
}
