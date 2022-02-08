### Simple ListItemAction

```jsx
import {
  Grid,
  List,
  ListItem,
  ListItemAction,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@hdbank/ui';

import Inbox from '@hdbank/icons/components/Inbox';
import EditInBox from '@hdbank/icons/components/EditInBox';
import TrashBin from '@hdbank/icons/components/TrashBin';

<Grid container spacing={6}>
  <Grid item md={3}>
    <Paper>
      <List>
        <ListItem>
          <ListItemIcon icon={Inbox} />
          <ListItemText>Inbox</ListItemText>
          <ListItemAction icon={TrashBin} />
        </ListItem>
        <ListItem>
          <ListItemIcon icon={EditInBox} />
          <ListItemText>Drafts</ListItemText>
          <ListItemAction icon={TrashBin} />
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```
