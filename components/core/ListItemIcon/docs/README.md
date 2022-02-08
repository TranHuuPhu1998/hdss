### Simple ListItemIcon

```jsx
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@hdbank/ui';

import Inbox from '@hdbank/icons/components/Inbox';
import EditInBox from '@hdbank/icons/components/EditInBox';

<Grid container spacing={6}>
  <Grid item md={3}>
    <Paper>
      <List>
        <ListItem>
          <ListItemIcon icon={Inbox} />
          <ListItemText>Inbox</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon icon={EditInBox} />
          <ListItemText>Drafts</ListItemText>
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```

### Icon sizes

```jsx
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@hdbank/ui';

import Inbox from '@hdbank/icons/components/Inbox';
import EditInBox from '@hdbank/icons/components/EditInBox';
import TrashBin from '@hdbank/icons/components/TrashBin';

<Grid container spacing={6}>
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Tiny</Typography>
    </Grid>

    <Grid item>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon icon={Inbox} size="xs" />
            <ListItemText>Inbox</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  </Grid>

  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Small</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon icon={Inbox} size="sm" />
            <ListItemText>Inbox</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  </Grid>

  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Medium</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon icon={Inbox} size="md" />
            <ListItemText>Inbox</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  </Grid>
  
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Large</Typography>
    </Grid>

    <Grid item>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon icon={Inbox} size="lg" />
            <ListItemText>Inbox</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  </Grid>
</Grid>
```
