## Button
Buttons allow users to take actions, and make choices, with a single tap.

### Interactive demo
This demo lets you preview the button component, its variations, and configuration options.

#### Primary (default)

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

<Button variant={ButtonVariants.primary} fullWidth={false}>
  Button
</Button>
```

#### Secondary

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

<Button variant={ButtonVariants.secondary} fullWidth={false}>
  Button
</Button>
```

#### Ghost

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

<Button variant={ButtonVariants.ghost} fullWidth={false}>
  Button
</Button>
```

#### Invert

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

<Button variant={ButtonVariants.invert} fullWidth={false}>
  Button
</Button>
```

### Disabled

```tsx
import { Button } from '@hdbank/ui';

<Button fullWidth={false} disabled>
  Button
</Button>
```

### Loading

```tsx
import { Button } from '@hdbank/ui';

<Button fullWidth={false} loading>
  Button
</Button>
```

**Interactive**
```tsx
import { useEffect, useState } from 'react';
import { Button } from '@hdbank/ui';

const [loading, setLoading] = useState(false);
const onClick = () => {
  setLoading(true);
};

useEffect(() => {
  const timeout = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => {
    clearTimeout(timeout);
  }
});

<Button fullWidth={false} loading={loading} onClick={onClick}>
  Button
</Button>
```

### Icon Button
```tsx
import { Button } from '@hdbank/ui';
import Sent from '@hdbank/icons/components/Send';

<Button fullWidth={false} icon={Sent}/>
```

### Icon and Label
coming soon...


### Sizes

```tsx
import { Grid, Button, ButtonSizes } from '@hdbank/ui';

<Grid container spacing={2} alignItems="end">
  <Grid item md={2}>
    <Button size={ButtonSizes.xl}>
      Extra Large
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button size={ButtonSizes.lg}>
      Large
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button size={ButtonSizes.md}>
      Medium
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button size={ButtonSizes.sm}>
      Small
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button size={ButtonSizes.xs}>
      Extra small
    </Button>
  </Grid>
</Grid>

```


### All Variants

**Interactive**
```tsx
import { Grid, Button, ButtonVariants } from '@hdbank/ui';

<Grid container spacing={2}>
  <Grid item md={2}>
    <Button variant={ButtonVariants.primary}>
      Primary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.secondary}>
      Secondary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.ghost}>
      Ghost
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.invert}>
      Invert
    </Button>
  </Grid>
</Grid>
```

**Disabled**
```tsx
import { Grid, Button, ButtonVariants } from '@hdbank/ui';

<Grid container spacing={2}>
  <Grid item md={2}>
    <Button variant={ButtonVariants.primary} disabled>
      Primary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.secondary} disabled>
      Secondary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.ghost} disabled>
      Ghost
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.invert} disabled>
      Invert
    </Button>
  </Grid>
</Grid>
```

**Loading**
```tsx
import { Grid, Button, ButtonVariants } from '@hdbank/ui';

<Grid container spacing={2}>
  <Grid item md={2}>
    <Button variant={ButtonVariants.primary} loading>
      Primary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.secondary} loading>
      Secondary
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.ghost} loading>
      Ghost
    </Button>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.invert} loading>
      Invert
    </Button>
  </Grid>
</Grid>
```

**Icon Button**
```tsx
import { Grid, Button, ButtonVariants } from '@hdbank/ui';
import Sent from '@hdbank/icons/components/Send';

<Grid container spacing={2}>
  <Grid item md={2}>
    <Button variant={ButtonVariants.primary} icon={Sent}/>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.secondary} icon={Sent}/>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.ghost} icon={Sent}/>
  </Grid>
  <Grid item md={2}>
    <Button variant={ButtonVariants.invert} icon={Sent}/>
  </Grid>
</Grid>
```