### Simple TextField

```jsx
import { TextField } from '@hdbank/ui';

<TextField placeholder="Simple TextField" />
```

### TextField props

```jsx
import {
  Grid,
  Link,
  TextField,
  Typography,
} from '@hdbank/ui';

const optionalContent = (
  <Typography component={Link} href="#" type="link">
    Forgot password?
  </Typography>
);

<Grid container spacing={6}>
  <Grid item md={4}>
    <TextField
      label="Inputted"
      value="Input Text"
      placeholder="Input text"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label="Disabled"
      value="Input Text"
      disabled
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      type="password"
      label="Password"
      placeholder="Input your password"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label="Read Only"
      value="Input Text"
      readOnly
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      type="number"
      label="Number"
      placeholder="Input your number"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      type="email"
      label="Email"
      placeholder="Input your email"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      type="password"
      label="Optional"
      optional={optionalContent}
      placeholder="Input your password"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label="Note"
      note="Some text note"
      placeholder="Input text"
    />
  </Grid>
</Grid>
```

### Statuses

#### Primary

```jsx
import {
  Grid,
  InputStatuses,
  TextField,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid item md={4}>
    <TextField
      value="Primary TextField"
      status={InputStatuses.primary}
      placeholder="Input text"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Primary TextField"
      status={InputStatuses.primary}
      placeholder="Input text"
      note="Some text note"
    />
  </Grid>  
  <Grid item md={4}>
    <TextField
      label={' '}
      value="Primary TextField"
      status={InputStatuses.primary}
      placeholder="Input text"
      optional="Optional"
    />
  </Grid>
</Grid>
```

#### Error

```jsx
import {
  Grid,
  Icon,
  InputAdornment,
  InputStatuses,
  TextField,
} from '@hdbank/ui';

import AlertCircle from '@hdbank/icons/components/AlertCircle';

<Grid container spacing={6}>
  <Grid item md={4}>
    <TextField
      value="Error TextField"
      status={InputStatuses.error}
      placeholder="Input text"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Error TextField"
      status={InputStatuses.error}
      placeholder="Input text"
      note="Error note"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Error TextField"
      status={InputStatuses.error}
      placeholder="Input text"
      afterInput={
        <InputAdornment>
          <Icon component={AlertCircle} />
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label={' '}
      value="Error TextField"
      status={InputStatuses.error}
      placeholder="Input text"
      optional="Optional"
    />
  </Grid>
</Grid>
```

#### Warning

```jsx
import {
  Grid,
  Icon,
  InputAdornment,
  InputStatuses,
  TextField,
} from '@hdbank/ui';

import AlertTriangle from '@hdbank/icons/components/AlertTriangle';

<Grid container spacing={6}>
  <Grid item md={4}>
    <TextField
      value="Warning TextField"
      status={InputStatuses.warning}
      placeholder="Input text"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Warning TextField"
      status={InputStatuses.warning}
      placeholder="Input text"
      note="Warning note"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Warning TextField"
      status={InputStatuses.warning}
      placeholder="Input text"
      afterInput={
        <InputAdornment>
          <Icon component={AlertTriangle} />
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label={' '}
      value="Warning TextField"
      status={InputStatuses.warning}
      placeholder="Input text"
      optional="Optional"
    />
  </Grid>
</Grid>
```

#### Success

```jsx
import {
  Grid,
  Icon,
  InputAdornment,
  InputStatuses,
  TextField,
} from '@hdbank/ui';

import CheckMark from '@hdbank/icons/components/CheckMark';

<Grid container spacing={6}>
  <Grid item md={4}>
    <TextField
      value="Success TextField"
      status={InputStatuses.success}
      placeholder="Input text"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Success TextField"
      status={InputStatuses.success}
      placeholder="Input text"
      note="Success note"
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      value="Success TextField"
      status={InputStatuses.success}
      placeholder="Input text"
      afterInput={
        <InputAdornment>
          <Icon component={CheckMark} />
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={4}>
    <TextField
      label={' '}
      value="Success TextField"
      status={InputStatuses.success}
      placeholder="Input text"
      optional="Optional"
    />
  </Grid>
</Grid>
```

### Adornments

```jsx
import {
  Grid,
  Icon,
  InputAdornment,
  TextField,
} from '@hdbank/ui';

import EyeOpen from '@hdbank/icons/components/EyeOpen';
import EyeClose from '@hdbank/icons/components/EyeClose';
import ShieldPermission from '@hdbank/icons/components/ShieldPermission';

const [showPassword, togglePassword] = React.useState(false);

const handleShowPassword = () => {
  togglePassword(!showPassword);
};

<Grid container spacing={6}>
  <Grid item md={3}>
    <TextField
      label="Weight"
      value={69}
      placeholder="Your weight"
      beforeInput={
        <InputAdornment>
          Kg
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      label="Weight"
      value={69}
      placeholder="Your weight"
      afterInput={
        <InputAdornment>
          Kg
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      label="Username"
      placeholder="Username or email address"
      beforeInput={
        <InputAdornment>
          <Icon component={ShieldPermission} />
        </InputAdornment>
      }
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      type={showPassword ? 'text' : 'password'}
      label="Password"
      placeholder="Password"
      afterInput={
        <InputAdornment>
          <Icon
            style={{ cursor: 'pointer' }}
            onClick={handleShowPassword}
            component={showPassword ? EyeOpen : EyeClose}
          />
        </InputAdornment>
      }
    />
  </Grid>
</Grid>
```
### Sizes

```jsx
import {
  Grid,
  InputSizes,
  TextField,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid item md={3}>
    <TextField
      size={InputSizes.lg}
      label="Big"
      placeholder="Input big"
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      size={InputSizes.md}
      label="Medium"
      placeholder="Input medium"
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      size={InputSizes.sm}
      label="Small"
      placeholder="Input small"
    />
  </Grid>
  <Grid item md={3}>
    <TextField
      size={InputSizes.xs}
      label="Tiny"
      placeholder="Input tiny"
    />
  </Grid>
</Grid>
```
