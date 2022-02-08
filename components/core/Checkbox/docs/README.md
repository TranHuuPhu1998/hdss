## Usage

### Simple Checkbox

```jsx
import { Checkbox } from "@hdbank/ui";
<Checkbox />;
```

### Checkbox with label

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox>Label</Checkbox>;
```

### Controlled Checkbox

```jsx
import { Checkbox } from "@hdbank/ui";
const [isChecked, setIsChecked] = React.useState(false);

const handleCheck = (event) => {
  const { checked, name } = event.target;
  console.log({ name });

  setIsChecked(checked);
};

<Checkbox checked={isChecked} name="nameOfCheckbox" onChange={handleCheck}>
  Label
</Checkbox>;
```

### Status

#### Disabled

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox disabled>Disabled</Checkbox>;
```

#### Checked

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox checked>Checked</Checkbox>;
```

#### Checked and disabled

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox checked disabled>
  Checked and disabled
</Checkbox>;
```

#### Indeterminate

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox isIntermediate checked>
  Indeterminate
</Checkbox>;
```

#### Indeterminate and disabled

```jsx
import { Checkbox } from "@hdbank/ui";

<Checkbox isIntermediate checked disabled>
  Indeterminate and disabled
</Checkbox>;
```
