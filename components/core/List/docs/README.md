### Simple list

```jsx
import {
  Divider,
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
      <Divider />
      <List>
        <ListItem>
          <ListItemText>Trash</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Spam</ListItemText>
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```

### Nested list

```jsx
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@hdbank/ui';

import Inbox from '@hdbank/icons/components/Inbox';
import EditInBox from '@hdbank/icons/components/EditInBox';
import Star from '@hdbank/icons/components/Star';

const [isOpen, toggleList] = React.useState(false);

const handleToggleList = () => {
  toggleList(!isOpen);
};

<Grid container spacing={6}>
  <Grid item md={3}>
    <Paper>
      <List>
        <ListItem
          open={isOpen}
          activated={isOpen}
          onClick={handleToggleList}
        >
          <ListItemIcon icon={Inbox} />
          <ListItemText>Inbox</ListItemText>
        </ListItem>
        <Collapse in={isOpen}>
          <List>
            <ListItem>
              <ListItemIcon icon={Star} />
              <ListItemText>Starred</ListItemText>
            </ListItem>
            <List>
              <ListItemText>All</ListItemText>
            </List>
          </List>
        </Collapse>
        <ListItem>
          <ListItemIcon icon={EditInBox} />
          <ListItemText>Drafts</ListItemText>
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```

### Interactive

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
      <Typography variant="subtitle2">Text only</Typography>
    </Grid>

    <Grid item>
      <Paper>
        <List>
          <ListItem>
            <ListItemText>Inbox</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Drafts</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  </Grid>

  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Icon with text</Typography>
    </Grid>
    
    <Grid item>
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

  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Icon with text and action</Typography>
    </Grid>
    
    <Grid item>
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

  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Activated</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List>
          <ListItem activated>
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
  
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Disabled</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List>
          <ListItem disabled>
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
</Grid>
```

### Directions

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

<Grid container spacing={6}>
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Column (Default)</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List direction="column">
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
  
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Column Reverse</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List direction="column-reverse">
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
  
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Row</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List direction="row">
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
  
  <Grid item md={3} container spacing={4} direction="column">
    <Grid item>
      <Typography variant="subtitle2">Row Reverse</Typography>
    </Grid>
    
    <Grid item>
      <Paper>
        <List direction="row-reverse">
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
</Grid>
```

### List controls

#### Checkbox

```jsx
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAction,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@hdbank/ui';

import Comment from '@hdbank/icons/components/Comment';

const [checked, setChecked] = React.useState({});

const handleChecked = key => {
  const newChecked = {
    ...checked,
    [key]: !checked[key],
  };

  setChecked(newChecked);
};

<Grid container spacing={6}>
  <Grid item md={3}>
    <Paper>
      <List>
        <ListItem activated={checked['c1']}>
          <ListItemIcon>
            <Checkbox
              checked={checked['c1']}
              onChange={() => handleChecked('c1')}
            />
          </ListItemIcon>
          <ListItemText>Line item 1</ListItemText>
          <ListItemAction icon={Comment} />
        </ListItem>
        <ListItem activated={checked['c2']}>
          <ListItemIcon>
            <Checkbox
              checked={checked['c2']}
              onChange={() => handleChecked('c2')}
            />
          </ListItemIcon>
          <ListItemText>Line item 2</ListItemText>
          <ListItemAction icon={Comment} />
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```

### Inset list

```jsx
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@hdbank/ui';

import Star from '@hdbank/icons/components/Star';

<Grid container spacing={6}>
  <Grid item md={3}>
    <Paper>
      <List>
        <ListItem>
          <ListItemIcon icon={Star} />
          <ListItemText>Chelsea Otakan</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText inset={true}>Eric Hoffman</ListItemText>
        </ListItem>
      </List>
    </Paper>
  </Grid>
</Grid>
```
