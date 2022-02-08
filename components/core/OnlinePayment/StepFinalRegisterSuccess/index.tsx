import cn from 'classnames';
import Box from 'components/core/Box';
import Button, { ButtonVariants } from 'components/core/Button';
import Grid from 'components/core/Grid';
import Typography, { TypoTypes, TypoVariants, TypoWeights } from 'components/core/Typography';
import CheckedSquare from 'icons/CheckedSquare';
import React from 'react';
import styles from './styles.module.scss';

type Props = {};

const StepFinalRegisterSuccesss = (props: Props) => {
  return (
    <Grid container direction="column">
      {/* row */}
      <Grid item>
        <Grid container alignItem="center" justifyContent="center">
          <Grid item xs="auto">
            <CheckedSquare />
          </Grid>
        </Grid>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={7}>
          <Typography
            weight={TypoWeights.bold}
            type={TypoTypes.titleDefault}
            variant={TypoVariants.subtitle2}
            component="div"
            className={styles['text-center']}
          >
            Đăng ký thành công
          </Typography>
        </Box>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={2} px={2}>
          <Typography
            variant={TypoVariants.body1}
            component="div"
            className={styles['text-center']}
          >
            Hệ thống đang xử lý tạo mới tài khoản thanh toàn trực tuyến.
            <br /> Kết quả sẽ được gửi đến Quý khách qua email và tin OTT (xem
            tại chức năng Thông tin HDBank)
          </Typography>
        </Box>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6}>
          <Grid container direction="column" spacing={2}>
            {/* row */}
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                  <Typography>Tên đăng nhập</Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    variant={TypoVariants.body1}
                    weight={TypoWeights.bold}
                  >
                    016 5654 363
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* row */}
            {/* row */}
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                  <Typography>Email</Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    variant={TypoVariants.body1}
                    weight={TypoWeights.bold}
                  >
                    tinhht@hdbank.com.vn
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* row */}
            {/* row */}
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                  <Typography>Họ và tên</Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    variant={TypoVariants.body1}
                    weight={TypoWeights.bold}
                  >
                    Hà Trung Tính
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* row */}
            {/* row */}
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item xs="auto">
                  <Typography>Số CMND/CCCD</Typography>
                </Grid>
                <Grid item xs="auto">
                  <Typography
                    variant={TypoVariants.body1}
                    weight={TypoWeights.bold}
                  >
                    1234567890
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* row */}
          </Grid>
        </Box>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs={9} md={7}>
              <Button fullWidth>Tiếp tục với HDSaison</Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={4}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs={7} md={5}>
              <Button fullWidth variant={ButtonVariants.outlined}>
                Tải app HDBank
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* row */}
      {/* row */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6} px={4}>
          <Typography
            component="div"
            className={cn(styles['text-center'], styles['help'])}
          >
            Hướng dẫn nạp tiền tài khoản <br/>thanh toán HDMoney
          </Typography>
        </Box>
      </Grid>
      {/* row */}
    </Grid>
  );
};

export default StepFinalRegisterSuccesss;
