### Basic usage

```jsx
import { TextArea } from '@hdbank/ui';

<TextArea placeholder="Simple TextArea" />
```

### TextArea props
```jsx
import {
  Grid,
  TextArea,
  Typography,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Input Text</Typography>
    </Grid>
    <Grid item>
      <TextArea value="Input text" placeholder="Type something" />
    </Grid>
  </Grid>
  
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Disabled</Typography>
    </Grid>
    <Grid item>
      <TextArea placeholder="Type something" disabled />
    </Grid>
  </Grid>
  
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Read Only</Typography>
    </Grid>
    <Grid item>
      <TextArea placeholder="Type something" readOnly />
    </Grid>
  </Grid>
  
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Title</Typography>
    </Grid>
    <Grid item>
      <TextArea
        placeholder="Type something"
        title="Input text in this area"
      />
    </Grid>
  </Grid>
  
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Min Rows</Typography>
    </Grid>
    <Grid item>
      <TextArea placeholder="Type something" minRows={2} />
    </Grid>
  </Grid>
  
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Max Rows</Typography>
    </Grid>
    <Grid item>
      <TextArea placeholder="Type something" maxRows={4} />
    </Grid>
  </Grid>
</Grid>
```

### Statuses

```jsx
import {
  Grid,
  InputStatuses,
  TextArea,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Primary</Typography>
    </Grid>
    <Grid item>
      <TextArea
        status={InputStatuses.primary}
        placeholder="Type something"
      />
    </Grid>
  </Grid>

  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Error</Typography>
    </Grid>
    <Grid item>
      <TextArea
        status={InputStatuses.error}
        placeholder="Type something"
      />
    </Grid>
  </Grid>

  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Warning</Typography>
    </Grid>
    <Grid item>
      <TextArea
        status={InputStatuses.warning}
        placeholder="Type something"
      />
    </Grid>
  </Grid>

  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Success</Typography>
    </Grid>
    <Grid item>
      <TextArea
        status={InputStatuses.success}
        placeholder="Type something"
      />
    </Grid>
  </Grid>
</Grid>
```

### Sizes

```jsx
import {
  Grid,
  InputSizes,
  TextArea,
} from '@hdbank/ui';

<Grid container spacing={6}>
  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Large</Typography>
    </Grid>
    <Grid item>
      <TextArea
        size={InputSizes.lg}
        placeholder="Type something"
      />
    </Grid>
  </Grid>

  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Medium</Typography>
    </Grid>
    <Grid item>
      <TextArea
        size={InputSizes.md}
        placeholder="Type something"
      />
    </Grid>
  </Grid>

  <Grid
    item
    md={4}
    container
    direction="column"
    spacing={2}
  >
    <Grid item>
      <Typography>Small</Typography>
    </Grid>
    <Grid item>
      <TextArea
        size={InputSizes.sm}
        placeholder="Type something"
      />
    </Grid>
  </Grid>
</Grid>
```
