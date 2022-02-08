<h3>Basic usage</h3>

Using `RadioGroup` component with `useRadio` hook.

```jsx
import useRadio from '@hdbank/ui/hooks/useRadio';

const { selected, onChange } = useRadio('value-1');

<RadioGroup selected={selected} onChange={onChange}>
  <Radio value="value-1">Item 1</Radio>
  <br />
  <Radio value="value-2">Item 2</Radio>
  <br />
  <Radio value="value-3" disabled>
    Item 3
  </Radio>
  <br />
  <Radio value="value-4">Item 4</Radio>
</RadioGroup>;
```
