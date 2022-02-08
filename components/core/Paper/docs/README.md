### Basic usage

```jsx
import { Paper } from '@hdbank/ui';

<Paper>Do something great!</Paper>
```

### Radius

```jsx
import { Grid, Paper } from '@hdbank/ui';

const paperStyle = {
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid #ccc',
};

<Grid container spacing={4}>
  <Grid item xs={2}>
    <Paper radius="none" style={paperStyle}>
      None
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper radius="light" style={paperStyle}>
      Light
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper radius="regular" style={paperStyle}>
      Regular (Default)
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper radius="bold" style={paperStyle}>
      Bold
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper radius="max" style={paperStyle}>
      Max
    </Paper>
  </Grid>
</Grid>
```

### Elevation

```jsx
import { Grid, Paper } from '@hdbank/ui';

const paperStyle = {
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid #ccc',
};

<Grid container spacing={4}>
  <Grid item xs={2}>
    <Paper elevation={0} style={paperStyle}>
      0 (Default)
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper elevation={1} style={paperStyle}>
      1
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper elevation={2} style={paperStyle}>
      2
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper elevation={3} style={paperStyle}>
      3
    </Paper>
  </Grid>
  <Grid item xs={2}>
    <Paper elevation={4} style={paperStyle}>
      4
    </Paper>
  </Grid>
</Grid>
```
