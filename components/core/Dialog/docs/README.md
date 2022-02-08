### Simple dialog

```jsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  TypoWeights,
  TypoVariants,
} from '@hdbank/ui';

const [open, toggleDialog] = React.useState(false);
const handleCloseModal = () => toggleDialog(false);

<div>
  {open && (
    <Dialog onClose={handleCloseModal}>
      <DialogHeader onClose={handleCloseModal}>
        <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
          Simple Dialog
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </DialogBody>
    </Dialog>
  )}
  <Button onClick={() => toggleDialog(true)} fullWidth={false}>
    Click to open
  </Button>
</div>
```

### Dialog with cover

```jsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogCover,
  Typography,
  TypoWeights,
  TypoVariants,
} from '@hdbank/ui';

const [open, toggleDialog] = React.useState(false);
const handleCloseModal = () => toggleDialog(false);

<div>
  {open && (
    <Dialog onClose={handleCloseModal}>
      <DialogCover
        onClose={handleCloseModal}
        image="https://media3.scdn.vn/img3/2019/5_17/OSe48O.jpg"
      />
      <DialogHeader>
        <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
          Dialog with cover
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </DialogBody>
    </Dialog>
  )}
  <Button onClick={() => toggleDialog(true)} fullWidth={false}>
    Click to open
  </Button>
</div>
```

### Confirm Dialog

```jsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Grid,
  ButtonVariants,
  Typography,
  TypoWeights,
  TypoVariants,
} from '@hdbank/ui';

const [open, toggleDialog] = React.useState(false);
const handleCloseModal = () => toggleDialog(false);

const footerStyle = {
  padding: '2.4rem',
  paddingTop: 0,
  textAlign: 'right',
};
const cancelButtonStyle = {
  marginRight: '1.2rem',
};

<div>
  {open && (
    <Dialog lg={5} onClose={handleCloseModal}>
      <DialogHeader onClose={handleCloseModal}>
        <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
          Confirm Dialog
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
      </DialogBody>
      <DialogFooter style={footerStyle}>
        <Button
          variant={ButtonVariants.secondary}
          onClick={handleCloseModal}
          style={cancelButtonStyle}
          fullWidth={false}
        >
          Cancel
        </Button>
        <Button onClick={handleCloseModal} fullWidth={false}>Confirm</Button>
      </DialogFooter>
    </Dialog>
  )}
  <Button onClick={() => toggleDialog(true)} fullWidth={false}>
    Click to open
  </Button>
</div>
```

### Alert Dialog

```jsx
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Grid,
  ButtonVariants,
  Typography,
  TypoWeights,
  TypoVariants,
} from '@hdbank/ui';

const [open, toggleDialog] = React.useState(false);
const handleCloseModal = () => toggleDialog(false);

const footerStyle = {
  padding: '2.4rem',
  paddingTop: 0,
  textAlign: 'right',
};
const cancelButtonStyle = {
  marginRight: '1.2rem',
};

<div>
  {open && (
    <Dialog lg={5} onClose={handleCloseModal}>
      <DialogHeader>
        <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
          Alert Dialog
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
      </DialogBody>
      <DialogFooter style={footerStyle}>
        <Button
          variant={ButtonVariants.secondary}
          onClick={handleCloseModal}
          style={cancelButtonStyle}
          fullWidth={false}
        >
          Disagree
        </Button>
        <Button onClick={handleCloseModal} fullWidth={false}>Agree</Button>
      </DialogFooter>
    </Dialog>
  )}
  <Button onClick={() => toggleDialog(true)} fullWidth={false}>
    Click to open
  </Button>
</div>
```
### Form dialogs

```jsx
import {
  Button,
  ButtonVariants,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Grid,
  Input,
  Typography,
  TypoWeights,
  TypoVariants,
} from '@hdbank/ui';

const [open, toggleDialog] = React.useState(false);
const handleCloseModal = () => toggleDialog(false);

const descStyle = {
  marginBottom: '2.4rem',
};
const footerStyle = {
  padding: '2.4rem',
  paddingTop: 0,
  textAlign: 'right',
};
const cancelButtonStyle = {
  marginRight: '1.2rem',
};

<div>
  {open && (
    <Dialog lg={5} onClose={handleCloseModal}>
      <DialogHeader>
        <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
          Subscribe
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography component="p" style={descStyle}>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </Typography>
        <Input type="email" placeholder="Email address" />
      </DialogBody>
      <DialogFooter style={footerStyle}>
        <Button
          variant={ButtonVariants.secondary}
          onClick={handleCloseModal}
          style={cancelButtonStyle}
          fullWidth={false}
        >
          Cancel
        </Button>
        <Button onClick={handleCloseModal} fullWidth={false}>Subscribe</Button>
      </DialogFooter>
    </Dialog>
  )}
  <Button onClick={() => toggleDialog(true)} fullWidth={false}>
    Click to open
  </Button>
</div>
```
