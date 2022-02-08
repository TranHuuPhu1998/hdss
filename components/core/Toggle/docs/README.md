## Usage

### Default 

#### Icon only

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle checked />
```

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle checked={false} />
```

#### Text

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle checked>Label</Toggle>
```

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle checked={false}>Label</Toggle>
```

### Disable

#### Icon only

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle disabled checked />
```

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle disabled checked={false} />
```

#### Text

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle disabled checked>Label</Toggle>
```

```jsx
import { Toggle } from '@hdbank/ui';

<Toggle disabled checked={false}>Label</Toggle>
```

### Colors

```jsx
import { Toggle, ToggleColors } from '@hdbank/ui';

<div>
  <p>
    <Toggle checked color={ToggleColors.red}>
      Red (default)
    </Toggle>
  </p>
  <p>
    <Toggle checked color={ToggleColors.green}>
      Green
    </Toggle>
  </p>
</div>
```

### Interactive

#### Icon only

```jsx
import { Toggle } from '@hdbank/ui';

const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onChange={() => setChecked(!checked)} />
```

#### Text

```jsx
import { Toggle } from '@hdbank/ui';

const [checked, setChecked] = React.useState(false);

<Toggle checked={checked} onChange={() => setChecked(!checked)}>
  Label
</Toggle>
```
