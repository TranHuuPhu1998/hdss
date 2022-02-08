### Simple tooltip

```jsx
import { Button, Tooltip } from '@hdbank/ui';

import ArrowsDiagonals from '@hdbank/icons/components/ArrowsDiagonals';

<div>
  <Tooltip content="Show Fullscreen">
    <Button icon={ArrowsDiagonals} fullWidth={false}>Hover to show Tooltip</Button>
  </Tooltip>
</div>
```

### Tooltip placement

```jsx
import {
  Button,
  Grid,
  PopperPlacements,
  Tooltip,
} from '@hdbank/ui';

<div>
  <Grid container spacing={6} justifyContent="center">
    <Grid item md={2}>
      <Tooltip content="Top-Start" placement={PopperPlacements.topStart}>
        <Button>Top-Start</Button>
      </Tooltip>
    </Grid>
    <Grid item md={2}>
      <Tooltip content="Top" placement={PopperPlacements.top}>
        <Button>Top</Button>
      </Tooltip>
    </Grid>
    <Grid item md={2}>
      <Tooltip content="Top-End" placement={PopperPlacements.topEnd}>
        <Button>Top-End</Button>
      </Tooltip>
    </Grid>
  </Grid>

  <Grid container spacing={6} justifyContent="center">
    <Grid item md={2}>
      <Tooltip content="Left-Start" placement={PopperPlacements.leftStart}>
        <Button>Left-Start</Button>
      </Tooltip>
    </Grid>
    <Grid item md={4} />
    <Grid item md={2}>
      <Tooltip content="Right-Start" placement={PopperPlacements.rightStart}>
        <Button>Right-Start</Button>
      </Tooltip>
    </Grid>
  </Grid>

  <Grid container spacing={6} justifyContent="center">
    <Grid item md={2}>
      <Tooltip content="Left" placement={PopperPlacements.left}>
        <Button>Left</Button>
      </Tooltip>
    </Grid>
    <Grid item md={4} />
    <Grid item md={2}>
      <Tooltip content="Right" placement={PopperPlacements.right}>
        <Button>Right</Button>
      </Tooltip>
    </Grid>
  </Grid>
  
  <Grid container spacing={6} justifyContent="center">
    <Grid item md={2}>
      <Tooltip content="Left-End" placement={PopperPlacements.leftEnd}>
        <Button>Left-End</Button>
      </Tooltip>
    </Grid>
    <Grid item md={4} />
    <Grid item md={2}>
      <Tooltip content="Right-End" placement={PopperPlacements.rightEnd}>
        <Button>Right-End</Button>
      </Tooltip>
    </Grid>
  </Grid>
  
  <Grid container spacing={6} justifyContent="center">
    <Grid item md={2}>
      <Tooltip content="Bottom-Start" placement={PopperPlacements.bottomStart}>
        <Button>Bottom-Start</Button>
      </Tooltip>
    </Grid>
    <Grid item md={2}>
      <Tooltip content="Bottom" placement={PopperPlacements.bottom}>
        <Button>Bottom</Button>
      </Tooltip>
    </Grid>
    <Grid item md={2}>
      <Tooltip content="Bottom-End" placement={PopperPlacements.bottomEnd}>
        <Button>Bottom-End</Button>
      </Tooltip>
    </Grid>
  </Grid>
</div>
```

### Show tooltip after x milliseconds

```jsx
import { Button, Tooltip } from '@hdbank/ui';

<div>
  <Tooltip content="Delay tooltip" enterDelay={1 * 1000}>
    <Button fullWidth={false}>Keep hover 1 seconds to show Tooltip</Button>
  </Tooltip>
</div>
```

### Hide tooltip after x milliseconds

```jsx
import { Button, Tooltip } from '@hdbank/ui';

<div>
  <Tooltip content="Delay tooltip" leaveDelay={1 * 1000}>
    <Button fullWidth={false}>Hover to show Tooltip</Button>
  </Tooltip>
</div>
```
