## Usage

### Simple Select

- Note: the text display of each option must be string.

```jsx
import { Select, Option } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Select Attributes

#### Placeholder

- Note: the placeholder work with value of select is `undefined` or `null`.

```jsx
import { Select, Option } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState();

<Select placeholder="Choose hobby" value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Disabled

```jsx
import { Select, Option } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select disabled value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Custom style

```jsx
import { Select, Option } from "@hdbank/ui";
import styles from "./styles";

const hobbies = ["Coding", "Reading book", "Playing game", "Cooking"];
const [value, setValue] = React.useState(hobbies[0]);

<Select
  editable={true}
  value={value}
  onChange={setValue}
  className={styles.select}
  menuClassName={styles.customMenu}
>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Event handler

- The events includes: `onChange`, `onClick`, `onFocus`, `onBlur`.

```jsx
import { Select, Option } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

const handleClick = (event) => {
  console.log("handleClick", { event });
};

const handleFocus = (event) => {
  console.log("handleFocus", { event });
};

const handleBlur = (event) => {
  console.log("handleBlur", { event });
};

<Select
  value={value}
  onChange={setValue}
  onClick={handleClick}
  onFocus={handleFocus}
  onBlur={handleBlur}
>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Status

#### Primary

```jsx
import { Select, Option, InputStatuses } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select status={InputStatuses.primary} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Success

```jsx
import { Select, Option, InputStatuses } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select status={InputStatuses.success} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Warning

```jsx
import { Select, Option, InputStatuses } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select status={InputStatuses.warning} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Error

```jsx
import { Select, Option, InputStatuses } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select status={InputStatuses.error} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Size display

#### Extra small

```jsx
import { Select, Option, InputSizes } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select size={InputSizes.xs} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby} size={InputSizes.xs}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Small

```jsx
import { Select, Option, InputSizes } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select size={InputSizes.sm} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby} size={InputSizes.sm}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Medium

```jsx
import { Select, Option, InputSizes } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select size={InputSizes.md} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby} size={InputSizes.md}>
      {hobby}
    </Option>
  ))}
</Select>;
```

#### Large

- The large size is default.

```jsx
import { Select, Option, InputSizes } from "@hdbank/ui";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select size={InputSizes.lg} value={value} onChange={setValue}>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby} size={InputSizes.lg}>
      {hobby}
    </Option>
  ))}
</Select>;
```

### Custom before input

```jsx
import { Select, Option, InputAdornment } from "@hdbank/ui";
import HeartDuotoneActive from "@hdbank/icons/components/HeartDuotoneActive";

const hobbies = ["Coding", "Reading book", "Playing game"];
const [value, setValue] = React.useState(hobbies[0]);

<Select
  value={value}
  onChange={setValue}
  beforeInput={
    <InputAdornment>
      <HeartDuotoneActive />
    </InputAdornment>
  }
>
  {hobbies.map((hobby) => (
    <Option value={hobby} key={hobby}>
      {hobby}
    </Option>
  ))}
</Select>;
```
