import React from 'react';
import Box from 'components/core/Box';
import Button, { ButtonVariants } from 'components/core/Button';
import Grid from 'components/core/Grid';
import Image from 'components/core/Image';
import Typography, {
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import styles from './styles.module.scss';

interface Props {
  onNext: () => void;
}

function Step22VerifyFace(props: Props) {
  const { onNext } = { ...props };
  return (
    <Grid container className={styles['root']}>
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
                Xác thực điện tử
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        <Grid container direction="column" spacing={10}>
          <Grid item>
            {/* @ts-ignore */}
            <Box pt={6}>
              <Grid container alignItem="center" justifyContent="center">
                <Grid item>
                  <Typography
                    variant={TypoVariants.body1}
                    className={styles['text-center']}
                    component="div"
                  >
                    Đảm bảo khuôn mặt vừa khung hình
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <div className={styles['identity-card']}>
              <Image src="https://media.istockphoto.com/vectors/vector-face-identification-design-vector-id916972538?k=20&m=916972538&s=612x612&w=0&h=xyvmOWQ-jX8dqFfRuVkkR9NRgPV6MikiFiHJnj_JYr8=" />
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Grid
            container
            alignItem="center"
            justifyContent="center"
            direction="column"
            spacing={4}
          >
            <Grid item xs={5} md={4}>
              <Button fullWidth variant={ButtonVariants.outlined}>
                Chụp lại
              </Button>
            </Grid>
            <Grid item xs={5} md={4}>
              <Button fullWidth onClick={onNext}>
                Tiếp tục
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step22VerifyFace);
