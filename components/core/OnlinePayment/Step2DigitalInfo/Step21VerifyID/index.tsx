import cn from "classnames";
import { getLanguage } from "commons/helpers";
import { checkResultEkyc, parseInfoFromEKYC } from "commons/helpers/ekyc";
import Box from "components/core/Box";
import Button, { ButtonVariants } from "components/core/Button";
import Grid from "components/core/Grid";
import Image from "components/core/Image";
import Typography, {
  TypoVariants,
  TypoWeights,
} from "components/core/Typography";
import EKYCComponent from "components/HDBSPage/components/EKYCVerify";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React, { useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  onNext: () => void;
  onReEKYC?: any;
}

function Step21VerfyID(props: Props) {
  const { onNext, onReEKYC } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "step21VerifyID"]);
  const [recapture, setRecapture] = useState(false);

  function handleRecapture() {
    setRecapture(true);
  }

  function handleCaptureFinished(ekycData: any) {
    const info = parseInfoFromEKYC(ekycData);
    const resultEKYC = checkResultEkyc(ekycData);
    const { validEKYC } = resultEKYC;
    if (validEKYC) {
      onReEKYC(info);
    } else {
      setRecapture(false);
      // TODO: show error message dialog
    }
  }

  return (
    <Grid container className={styles["root"]}>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs="auto">
              <Typography
                variant={TypoVariants.subtitle2}
                weight={TypoWeights.bold}
                className={styles["text-center"]}
                component="div"
              >
                {t.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6}>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item>
              <Typography
                variant={TypoVariants.body1}
                className={styles["text-center"]}
                component="div"
              >
                {t.desc}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}></Box>
      </Grid>
      {/* item */}
      {!recapture && (
        <>
          <Grid item>
            <Grid container direction="column" spacing={10}>
              <Grid item>
                {/* @ts-ignore */}
                <Box px={4}>
                  <div className={styles["identity-card"]}>
                    <Image src="https://image.thanhnien.vn/w660/Uploaded/2022/aohpzvu/2020_10_13/cmnd02_dptu_cwui.jpg" />
                  </div>
                </Box>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box px={4}>
                  <div
                    className={cn(styles["identity-card"], styles["behind"])}
                  >
                    <Image src="https://cdn.luatvietnam.vn/uploaded/Images/Original/2020/12/03/cach-ghi-noi-cap-can-cuoc-cong-dan_0312135600.png" />
                  </div>
                </Box>
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
                  <Button
                    fullWidth
                    variant={ButtonVariants.outlined}
                    onClick={handleRecapture}
                  >
                    {t.capture}
                  </Button>
                </Grid>
                <Grid item xs={5} md={4}>
                  <Button fullWidth onClick={onNext}>
                    {t.continue}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </>
      )}
      {/* item */}
      {/* item */}
      {recapture && <EKYCComponent onFinish={handleCaptureFinished} />}
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step21VerfyID);
