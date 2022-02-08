import React from "react";
import Box from "components/core/Box";
import Button, { ButtonVariants } from "components/core/Button";
import Grid from "components/core/Grid";
import TextField from "components/core/TextField";
import Typography, {
  TypoVariants,
  TypoWeights,
} from "components/core/Typography";
import styles from "./styles.module.scss";
import { EKYCData } from "commons/helpers/ekyc";
import { useRouter } from "next/router";
import { getLanguage } from "commons/helpers";
import resources from "pages/assets/translate.json";
import _get from "lodash/get";

interface Props {
  onNext: () => void;
  ekycData: EKYCData;
}

function Step23ConfirmInformation(props: Props) {
  const { onNext, ekycData } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "step23ConfirmInformation"]);

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
      {/* item */}
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            {/* @ts-ignore */}
            <Box pt={6} px={4}>
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
          <Grid item>
            {/* @ts-ignore */}
            <Box mt={6}>
              <Grid container direction="column" spacing={4}>
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.fullName}
                    name="fullname"
                    placeholder=""
                    value="Hả Trung Tính"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.dateOfBirth}
                    name="dateOfBirth"
                    placeholder=""
                    value="24/12/1987"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.gender}
                    name="gender"
                    placeholder=""
                    value="Nữ"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.cmnd}
                    name="id"
                    placeholder=""
                    value="250884155"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.dateOfCMND}
                    name="dateOfId"
                    placeholder=""
                    value="24/12/1987"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.expiredDateOfCMND}
                    name="expiredDateOfId"
                    placeholder=""
                    value="24/12/2062"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.placeOfCMND}
                    name="id"
                    placeholder="placeOfId"
                    value="TPHCM"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.oldCMND}
                    name="oldId"
                    placeholder=""
                    value="XXXXXXXXXX"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <Typography
                    weight={TypoWeights.bold}
                    variant={TypoVariants.body1}
                  >
                    {t.address}
                  </Typography>
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.city}
                    name="city"
                    placeholder=""
                    value="TP. HCM"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.district}
                    name="city"
                    placeholder=""
                    value="Quận 1"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.ward}
                    name="city"
                    placeholder=""
                    value="Phường Đa Kao"
                  />
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <TextField
                    label={t.apartmentNumber}
                    name="city"
                    placeholder=""
                    value="68 Lê Duẩn"
                  />
                </Grid>
                {/* row */}
              </Grid>
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
              <Button fullWidth onClick={onNext}>
                {t.continue}
              </Button>
            </Grid>
            <Grid item xs={6} md={6}>
              <Button fullWidth variant={ButtonVariants.outlined}>
                {t.reset}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step23ConfirmInformation);
