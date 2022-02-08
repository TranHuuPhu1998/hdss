### Simple input

```jsx
import { Input, InputMoneyFormat } from '@hdbank/ui';

<Input
  component={InputMoneyFormat}
  placeholder="Input Money"
  value={9999999}
/>
```

### Custom suffix

```jsx
import {
  Grid,
  Input,
  InputMoneyFormat,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid item md={4}>
    <Input
      component={InputMoneyFormat}
      placeholder="Input Money"
      suffix=" ﹩"
      value={9999999}
    />
  </Grid>
  <Grid item md={4}>
    <Input
      component={InputMoneyFormat}
      placeholder="Input Money"
      suffix=" €"
      value={9999999}
    />
  </Grid>
</Grid>
```

### Custom decimal separator

```jsx
import { Input, InputMoneyFormat } from '@hdbank/ui';

<Input
  component={InputMoneyFormat}
  placeholder="Input Money"
  value={9999999.888}
  decimalSeparator="@"
/>
```

### Custom thousand separator

```jsx
import { Input, InputMoneyFormat } from '@hdbank/ui';

<Input
  component={InputMoneyFormat}
  placeholder="Input Money"
  value={9999999}
  decimalSeparator="."
  thousandSeparator=","
/>
```
