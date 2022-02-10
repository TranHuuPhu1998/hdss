import React, { useEffect, useState } from 'react';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Grid from 'components/core/Grid';
import OtpInput from 'components/core/OtpInput';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import styles from './styles.module.scss';
import { getLanguage } from 'commons/helpers';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';

type Props = {
  onNext: () => void;
};

const PhoneVerification = (props: Props) => {
  const { onNext } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, lang);

  const [otp, setOtp] = useState<string | null>(null);

  function handleChangeOtp(otp: string) {
    setOtp(otp);
  }

  useEffect(() => {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', (e) => {
        const ac = new AbortController();
        navigator.credentials
          .get({
            // @ts-ignore
            otp: { transport: ['sms'] },
            signal: ac.signal,
          })
          .then((otp) => {
            console.log('>>>>> Get OTP: ', otp); //TODO: to-remove
            // @ts-ignore
            setOtp(otp?.code);
          })
          .catch((err) => {
            alert(err);
          });
      });
    }
  }, []);

  return (
    <Grid container>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs="auto">
              <Typography
                variant={TypoVariants.subtitle2}
                weight={TypoWeights.bold}
                className={styles['text-center']}
                component="div"
              >
                {t.step4PhoneVerification.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6} px={4}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item>
              <Typography
                variant={TypoVariants.body1}
                className={styles['text-center']}
                component="div"
              >
                {t.step4PhoneVerification.desc}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6} px={4}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item>
              <Typography
                variant={TypoVariants.body1}
                weight={TypoWeights.bold}
                className={styles['text-center']}
                component="div"
              >
                {t.step4PhoneVerification.label}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={4}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <OtpInput
                value={otp}
                onChange={handleChangeOtp}
                numInputs={6}
                separator={<span>&nbsp;</span>}
                placeholder="_"
                className={styles['otp']}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={4} px={10}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item>
              <Typography
                variant={TypoVariants.body1}
                className={styles['text-center']}
                component="div"
              >
                {t.step4PhoneVerification.cannotReceiveSMS}?{' '}
                <Typography
                  variant={TypoVariants.body1}
                  type={TypoTypes.error}
                  className={styles['resend-otp']}
                >
                  {t.step4PhoneVerification.resendOTP}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={4}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item>
              <Typography
                type={TypoTypes.titleSub}
                variant={TypoVariants.body1}
                className={styles['text-center']}
                component="div"
              >
                (01:57)
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs={5} md={4}>
              <Button fullWidth onClick={onNext}>
                {t.step4PhoneVerification.button.confirm}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
    </Grid>
  );
};

export default PhoneVerification;
