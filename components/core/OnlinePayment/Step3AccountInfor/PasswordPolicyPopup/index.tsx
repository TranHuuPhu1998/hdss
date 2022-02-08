import React, { useState } from 'react';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Checkbox from 'components/core/Checkbox';
import Dialog from 'components/core/Dialog';
import DialogBody from 'components/core/DialogBody';
import DialogHeader from 'components/core/DialogHeader';
import Grid from 'components/core/Grid';
import Icon from 'components/core/Icon';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights
} from 'components/core/Typography';
import InforSquare from 'icons/InforSquare';
import { POPUP_DATA } from './const';
import styles from './styles.module.scss';

type Props = {};

const AcceptPolicyPopup = (props: Props) => {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <>
      <Typography
        variant={TypoVariants.body1}
        component="div"
        className={styles['text-center']}
        onClick={handleToggle}
      >
        Quy định đặt mật khẩu
      </Typography>
      {open && (
        <Dialog onClose={handleToggle}>
          <DialogHeader onClose={handleToggle}></DialogHeader>
          <DialogBody>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItem="center"
                  justifyContent="center"
                  className={styles['header']}
                >
                  <Grid item xs="auto">
                    <Icon
                      className={styles['icon-infor-square']}
                      component={InforSquare}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={8}>
                  <Typography
                    variant={TypoVariants.subtitle2}
                    weight={TypoWeights.bold}
                    component="div"
                    className={styles['text-center']}
                  >
                    Quy định đặt mật khẩu
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={2}>
                  <Grid container spacing={2} direction="column">
                    {POPUP_DATA.map((x, index) => (
                      <Grid item key={index}>
                        <Checkbox
                          checked
                          value={index.toString()}
                          name={`data-${index}`}
                        >
                          <Typography
                            variant={TypoVariants.body1}
                            type={TypoTypes.sub}
                          >
                            {x}
                          </Typography>
                        </Checkbox>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Grid container alignItem="center" justifyContent="center">
                  <Grid item xs={4} md={3}>
                    {/* @ts-ignore */}
                    <Box mt={6}>
                      <Button fullWidth onClick={handleToggle}>
                        Đóng
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
};

export default AcceptPolicyPopup;
