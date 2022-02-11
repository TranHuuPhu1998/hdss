import { getLanguage } from 'commons/helpers';
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
  TypoWeights,
} from 'components/core/Typography';
import InforSquare from 'icons/InforSquare';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import React, { useState } from 'react';
import { POPUP_DATA } from './const';
import styles from './styles.module.scss';

type Props = {};

const AcceptPolicyPopup = (props: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, lang);

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
        {t.step33AccountInfor.passwordRules.title}
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
                    {t.step33AccountInfor.passwordRules.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={2}>
                  <Grid container spacing={2} direction="column">
                    {POPUP_DATA.map((_, index) => (
                      <Grid item key={index}>
                        <Checkbox
                          checked
                          value={index.toString()}
                          name={`data-${index}`}
                          className={styles['checkbox']}
                        >
                          <Typography
                            variant={TypoVariants.body1}
                            type={TypoTypes.sub}
                          >
                            {
                              t.step33AccountInfor.passwordRules.content[
                                (index + 1).toString()
                              ]
                            }
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
                        {t.step33AccountInfor.button.close}
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
