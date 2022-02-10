import cn from 'classnames';
import Box from 'components/core/Box';
import Button, { ButtonVariants } from 'components/core/Button';
import Grid from 'components/core/Grid';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import CheckedSquare from 'icons/CheckedSquare';
import React from 'react';
import styles from './styles.module.scss';
import { getLanguage } from 'commons/helpers';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';

type Props = {};

const StepFinalRegisterSuccesss = (props: Props) => {
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, lang);

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
            {t.stepFinalRegisterSuccess.title}
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
            {t.stepFinalRegisterSuccess.processing}
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
                  <Typography>
                    {t.stepFinalRegisterSuccess.field.username}
                  </Typography>
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
                  <Typography>
                    {t.stepFinalRegisterSuccess.field.email}
                  </Typography>
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
                  <Typography>
                    {t.stepFinalRegisterSuccess.field.fullname}
                  </Typography>
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
                  <Typography>
                    {t.stepFinalRegisterSuccess.field.idNumber}
                  </Typography>
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
              <Button fullWidth>
                {t.stepFinalRegisterSuccess.button.continue}
              </Button>
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
                {t.stepFinalRegisterSuccess.button.downloadApp}
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
            {t.stepFinalRegisterSuccess.button.guideline}
          </Typography>
        </Box>
      </Grid>
      {/* row */}
    </Grid>
  );
};

export default StepFinalRegisterSuccesss;
