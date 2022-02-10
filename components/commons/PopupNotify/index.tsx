import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import Box from '@mui/system/Box';
import { Theme } from '@mui/system/createTheme';
import { getLanguage } from 'commons/helpers';
import { Button } from 'components/core/Button';
import { Icon } from 'components/core/Icon';
import Typography, {
  TypoTypes,
  TypoVariants,
} from 'components/core/Typography';
import Times from 'icons/Times';
import _get from 'lodash/get';
import Image from 'next/image';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import notifyError from 'public/asset/images/notifyError.png';
import React from 'react';
import TimerElement from './timerElement';

interface Props extends DialogProps {
  toggleModal: () => void;
  iconNotify?: React.ReactNode;
  title?: string;
  desc?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  rootDialog: {
    '& .MuiPaper-root': {
      width: '20vw',
      borderRadius: '15px',
      [theme.breakpoints?.down('sm')]: {
        width: '90vw',
      },
    },
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    textAlign: 'center',
  },
  desc: {
    fontWeight: 400,
    fontSize: 16,
    textAlign: 'center',
  },
}));

const PopupNotify = (props: Props) => {
  const {
    title = 'notify',
    desc = 'Điều khoản, điều kiện',
    toggleModal,
    open,
    ...rest
  } = props;
  const classes = useStyles();

  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, 'popupNotify']);

  const _handleClose = () => {
    toggleModal && toggleModal();
  };
  return (
    <Dialog open={open} className={classes.rootDialog} {...rest}>
      <Box pt={1} pb={2} px={2}>
        <Box display="flex" justifyContent="end" mt={1}>
          {/* @ts-ignore */}
          <Icon component={Times} color="#BCC0CC" width={16} height={16} />
        </Box>
        <Box>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Box display="flex" justifyContent="center">
                <Image src={notifyError} alt="notify" />
              </Box>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item className={classes.title}>
                  {t[title]}
                </Grid>
                <Grid item className={classes.desc}>
                  <Typography variant={TypoVariants.body1} type={TypoTypes.sub}>
                    {desc}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item justifyContent="center" display="flex">
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={4}>
                  <Button onClick={_handleClose} fullWidth>
                    {t?.close}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TimerElement
                textAutoClose={t?.autoClose}
                toggleModal={_handleClose}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupNotify;
