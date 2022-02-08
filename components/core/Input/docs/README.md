### Sizes

#### Basic
```jsx
import {
  Input,
  InputSizes,
} from '@hdbank/ui';

<React.Fragment>
  <Grid container spacing={2} alignItems="end">
    <Grid item md={2}>
      <Input
        size={InputSizes.lg}
        value='Large | default'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.md}
        value='Medium'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.sm}
        value='Small'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.xs}
        value='Extra small'
      />
    </Grid>
  </Grid>
</React.Fragment>
```

#### With adornments

```jsx
import {
  Input,
  InputAdornment,
  InputSizes,
  Icon,
} from '@hdbank/ui';
import Search from '@hdbank/icons/components/Search';

<React.Fragment>
  <Grid container spacing={2} alignItems="end">
    <Grid item md={2}>
      <Input
        size={InputSizes.lg}
        value='Large | default'
        afterInput={
          <InputAdornment>
            <Icon component={Search} />
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.md}
        value='Medium'
        afterInput={
          <InputAdornment>
            <Icon component={Search} />
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.sm}
        value='Small'
        afterInput={
          <InputAdornment>
            <Icon component={Search} />
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        size={InputSizes.xs}
        value='Extra small'
        afterInput={
          <InputAdornment>
            <Icon component={Search} />
          </InputAdornment>
        }
      />
    </Grid>
  </Grid>
</React.Fragment>
```

### Status

```jsx
import {
  Input,
  InputStatuses
} from '@hdbank/ui';

<React.Fragment>
  <Grid container spacing={2} alignItems="end">
    <Grid item md={2}>
      <Input
        status={InputStatuses.primary}     
        value='primary | default'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        status={InputStatuses.success}     
        value='success'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        status={InputStatuses.warning}     
        value='warning'
      />
    </Grid>
    <Grid item md={2}>
      <Input
        status={InputStatuses.error}     
        value='error'
      />
    </Grid>
  </Grid>
</React.Fragment>
```

### Input Adornments

```jsx
import {
  Input,
  InputAdornment,
  Icon
} from '@hdbank/ui';
import Search from '@hdbank/icons/components/Search';
import Folder from '@hdbank/icons/components/Folder';

<React.Fragment>
  <Grid container spacing={2} alignItems="end">
    <Grid item md={2}>
      <Input
        value='After Input'
        placeholder="After Input"
        afterInput={
          <InputAdornment>
            VND
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        value='After Input with Icon'
        placeholder="After Input"
        afterInput={
          <InputAdornment>
            <Icon component={Search} />
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        value='Before Input'
        beforeInput={
          <InputAdornment>
            VND
          </InputAdornment>
        }
      />
    </Grid>
    <Grid item md={2}>
      <Input
        value='Before Input with Icon'
        beforeInput={
          <InputAdornment>
            <Icon component={Folder} />
          </InputAdornment>
        }
      />
    </Grid>
  </Grid>
</React.Fragment>
```

