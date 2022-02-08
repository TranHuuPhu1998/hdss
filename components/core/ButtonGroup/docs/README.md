## Button Group
The ButtonGroup component can be used to group related buttons.

### Basic button group
```tsx
import { ButtonGroup, Button, ButtonVariants } from '@hdbank/ui';

<ButtonGroup variant={ButtonVariants.primary}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button>Button 4</Button>
  <Button>Button 5</Button>
</ButtonGroup>
```

### Sizes

```tsx
import { ButtonGroup, Button, ButtonSizes } from '@hdbank/ui';

<ButtonGroup size={ButtonSizes.xl}>
  <Button>Extra Large</Button>
  <Button>Extra Large</Button>
  <Button>Extra Large</Button>
  <Button>Extra Large</Button>
  <Button>Extra Large</Button>
</ButtonGroup>
```

```tsx
import { ButtonGroup, Button, ButtonSizes } from '@hdbank/ui';

<ButtonGroup size={ButtonSizes.lg}>
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
</ButtonGroup>
```

```tsx
import { ButtonGroup, Button, ButtonSizes } from '@hdbank/ui';

<ButtonGroup size={ButtonSizes.md}>
  <Button>Medium</Button>
  <Button>Medium</Button>
  <Button>Medium</Button>
  <Button>Medium</Button>
  <Button>Medium</Button>
</ButtonGroup>
```

```tsx
import { ButtonGroup, Button, ButtonSizes } from '@hdbank/ui';

<ButtonGroup size={ButtonSizes.sm}>
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
</ButtonGroup>
```

```tsx
import { ButtonGroup, Button, ButtonSizes } from '@hdbank/ui';

<ButtonGroup size={ButtonSizes.xs}>
  <Button>Extra small</Button>
  <Button>Extra small</Button>
  <Button>Extra small</Button>
  <Button>Extra small</Button>
  <Button>Extra small</Button>
</ButtonGroup>
```

### Custom

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

import Sent from '@hdbank/icons/components/Send';
import List from '@hdbank/icons/components/ListOrderTracking';
import Ads from '@hdbank/icons/components/Advertisement';
import Box from '@hdbank/icons/components/Box';
import Bell from '@hdbank/icons/components/BellDuotone';

<ButtonGroup variant={ButtonVariants.primary}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
  <Button icon={List} />
  <Button>Button 5</Button>
</ButtonGroup>


  

```

```tsx
import { Button, ButtonVariants } from '@hdbank/ui';

import Sent from '@hdbank/icons/components/Send';
import List from '@hdbank/icons/components/ListOrderTracking';
import Ads from '@hdbank/icons/components/Advertisement';
import Box from '@hdbank/icons/components/Box';
import Bell from '@hdbank/icons/components/BellDuotone';

<ButtonGroup size="lg" variant="secondary">
  <Button icon={Ads} />
  <Button icon={List} />
  <Button icon={Sent} />
  <Button icon={Box} />
  <Button icon={Bell} />
</ButtonGroup>
```
