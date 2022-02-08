import cn from "classnames";
import { getLanguage } from "commons/helpers";
import { EKYCData } from "commons/helpers/ekyc";
import Box from "components/core/Box";
import Button from "components/core/Button";
import Checkbox from "components/core/Checkbox";
import Collapse from "components/core/Collapse";
import Grid from "components/core/Grid";
import Icon from "components/core/Icon";
import Input from "components/core/Input";
import TextField from "components/core/TextField";
import Typography, {
  TypoVariants,
  TypoWeights,
} from "components/core/Typography";
import ChevronTop from "icons/ChevronTop";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React, { useState } from "react";
import AmericanSignPopup from "./AmericanSignPopup";
import styles from "./styles.module.scss";

interface Props {
  onNext: () => void;
  ekycData: EKYCData;
}

function Step24AdditionalInfor(props: Props) {
  const { onNext, ekycData } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "step23ConfirmInformation"]);

  const [isOpenPersonalInfor, setOpenPersonalInfor] = useState(true);
  const [isOpenJobInfor, setOpenJobInfor] = useState(true);
  const [isOpenContactInfor, setOpenContactInfor] = useState(true);

  function togglePersonalInfor() {
    setOpenPersonalInfor(!isOpenPersonalInfor);
  }

  function toggleJobInfor() {
    setOpenJobInfor(!isOpenJobInfor);
  }

  function toggleContactInfor() {
    setOpenContactInfor(!isOpenContactInfor);
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
                {t.additionalInfor}
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
            <Box mt={6}>
              <Grid container direction="column" spacing={4}>
                {/* personal information */}
                {/* row */}
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    onClick={togglePersonalInfor}
                  >
                    <Grid item xs="auto">
                      <Typography
                        variant={TypoVariants.body1}
                        weight={TypoWeights.bold}
                      >
                        {t.personalInfor}
                      </Typography>
                    </Grid>
                    <Grid item xs="auto">
                      <Icon
                        className={cn(styles["collapse-icon"], {
                          [styles["icon-close"]]: !isOpenPersonalInfor,
                        })}
                        component={ChevronTop}
                        width={12}
                        height={12}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* row */}
                {/* personal information */}
                {/* row */}
                <Grid item>
                  <Collapse in={isOpenPersonalInfor}>
                    <Grid container spacing={4}>
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.currentAddress}
                          name="address"
                          placeholder=""
                          value="68 Lê Duẩn"
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.academicLevel}
                          name="level"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.maritalStatus}
                          name="status"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                    </Grid>
                  </Collapse>
                </Grid>
                {/* row */}
                {/* job infor */}
                {/* row */}
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    onClick={toggleJobInfor}
                  >
                    <Grid item xs="auto">
                      <Typography
                        variant={TypoVariants.body1}
                        weight={TypoWeights.bold}
                      >
                        {t.jobInformation}
                      </Typography>
                    </Grid>
                    <Grid item xs="auto">
                      <Icon
                        className={cn(styles["collapse-icon"], {
                          [styles["icon-close"]]: !isOpenJobInfor,
                        })}
                        component={ChevronTop}
                        width={12}
                        height={12}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <Collapse in={isOpenJobInfor}>
                    <Grid container spacing={4}>
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.job}
                          name="job"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.jobPosition}
                          name="position"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.averageIncome}
                          name="averageIncome"
                          placeholder=""
                          value="50.000.000 VND"
                        />
                      </Grid>
                      {/* row */}
                    </Grid>
                  </Collapse>
                </Grid>
                {/* row */}
                {/* job infor */}
                {/* contact infor */}
                {/* row */}
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    onClick={toggleContactInfor}
                  >
                    <Grid item xs="auto">
                      <Typography
                        variant={TypoVariants.body1}
                        weight={TypoWeights.bold}
                      >
                        {t.communications}
                      </Typography>
                    </Grid>
                    <Grid item xs="auto">
                      <Icon
                        className={cn(styles["collapse-icon"], {
                          [styles["icon-close"]]: !isOpenContactInfor,
                        })}
                        component={ChevronTop}
                        width={12}
                        height={12}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* row */}
                {/* row */}
                <Grid item>
                  <Collapse in={isOpenContactInfor}>
                    <Grid container spacing={4}>
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.residentialAddress}
                          name="address"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.summaryAddress}
                          name="district"
                          placeholder=""
                          value=""
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <TextField
                          autoComplete="off"
                          label={t.branch}
                          name="city"
                          placeholder=""
                          value="TPHCM"
                        />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <Input name="district" placeholder="" value="Quận 1" />
                      </Grid>
                      {/* row */}
                      {/* row */}
                      <Grid item>
                        <Input name="branch" placeholder="" value="Hội sở" />
                      </Grid>
                      {/* row */}
                    </Grid>
                  </Collapse>
                </Grid>
                {/* row */}
                {/* contact infor */}
                <Grid item>
                  <Checkbox
                    name="isAcceptPolicy"
                    value="yes"
                    checked
                    className={styles["checkbox"]}
                  >
                    {/* @ts-ignore */}
                    <Box pr={2}>
                      <AmericanSignPopup />
                    </Box>
                  </Checkbox>
                </Grid>
              </Grid>
              {/* row */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box mt={10}>
          <Grid
            container
            alignItem="center"
            justifyContent="center"
            direction="column"
            spacing={4}
          >
            <Grid item xs={5} md={4}>
              {/* @ts-ignore */}
              <Box mt={10}>
                <Button fullWidth onClick={onNext}>
                  {t.continue}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step24AdditionalInfor);
