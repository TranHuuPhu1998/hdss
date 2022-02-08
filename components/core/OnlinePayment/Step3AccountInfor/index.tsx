import React, { useState } from "react";
import Box from "components/core/Box";
import Button from "components/core/Button";
import Checkbox from "components/core/Checkbox";
import Grid from "components/core/Grid";
import Icon from "components/core/Icon";
import TextField from "components/core/TextField";
import Typography, {
  TypoVariants,
  TypoWeights,
} from "components/core/Typography";
import DangerCircle from "icons/DangerCircle";
import AcceptPolicyPopup from "./AcceptPolicyPopup";
import PasswordPolicyPopup from "./PasswordPolicyPopup";
import styles from "./styles.module.scss";

type Props = {
  onNext: () => void;
};

const Step3AccountInfor = (props: Props) => {
  const { onNext } = { ...props };

  const [isAccepted, setIsAccepted] = useState(false);

  function handleAcceptPolicy(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsAccepted(!isAccepted);
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
                className={styles["text-center"]}
                component="div"
              >
                Thông tin đăng nhập
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
                className={styles["text-center"]}
                component="div"
              >
                Vui lòng đặt mật khẩu đăng nhập tài khoản thanh toán HD Money
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={6}>
          <Grid container direction="column" spacing={4}>
            {/* row */}
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs="auto">
                  <Typography
                    variant={TypoVariants.body1}
                    weight={TypoWeights.bold}
                  >
                    Thông tin đăng nhập
                  </Typography>
                </Grid>
                <Grid item xs="auto">
                  <Icon
                    className={styles["icon-warning"]}
                    component={DangerCircle}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* row */}
            <Grid item>
              <TextField
                label="Mật khẩu *"
                name="password"
                placeholder="Nhập mật khẩu"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nhập lại mật khẩu *"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <PasswordPolicyPopup />
        </Box>
      </Grid>
      {/* item */}
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Box pt={10}>
          <Checkbox
            name="isAcceptPolicy"
            value="yes"
            checked={isAccepted}
            onClick={handleAcceptPolicy}
            className={styles['checkbox']}
          >
            {/* @ts-ignore */}
            <Box pr={2}>
              <AcceptPolicyPopup />
            </Box>
          </Checkbox>
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
                Hoàn tất
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* item */}
    </Grid>
  );
};

export default Step3AccountInfor;
