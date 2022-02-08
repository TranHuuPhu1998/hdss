import React, { useState } from 'react';
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

type Props = {
  onNext: () => void;
};

const PhoneVerification = (props: Props) => {
  const { onNext } = { ...props };

  const [otp, setOtp] = useState(null);

  function handleChangeOtp(otp) {
    setOtp(otp);
  }

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
                Xác thực số điện thoại
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
                Vui lòng nhập mã xác thực đã được gửi đến số điện thoại của bạn
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
                Nhận mã xác nhận
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
            <Grid item md={4} sm={6} xs={10}>
              <OtpInput
                value={otp}
                onChange={handleChangeOtp}
                numInputs={6}
                separator={<span>&nbsp;</span>}
                placeholder="_"
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
                Quý khách không nhận được tin nhắn?{' '}
                <Typography variant={TypoVariants.body1} type={TypoTypes.error}>
                  Gửi lại OTP
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
                Xác nhận
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
