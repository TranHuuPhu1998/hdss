import React, { useState } from "react";
import Box from "components/core/Box";
import Button from "components/core/Button";
import Dialog from "components/core/Dialog";
import DialogBody from "components/core/DialogBody";
import DialogHeader from "components/core/DialogHeader";
import Grid from "components/core/Grid";
import Icon from "components/core/Icon";
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from "components/core/Typography";
import InforSquare from "icons/InforSquare";
import AccountDescription from "../AccountDescription";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import useScrollBlock from "hooks/useScrollBlock";

type Props = {};

const AcceptPolicyPopup = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  function handleToggle() {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [open]);

  return (
    <>
      <Typography
        variant={TypoVariants.body1}
        onClick={(e) => e.stopPropagation()}
      >
        Tôi đã đọc, hiểu và đồng ý{" "}
        <Typography
          type={TypoTypes.error}
          variant={TypoVariants.body1}
          className={styles["btn-open-popup"]}
          onClick={handleToggle}
        >
          Đề nghị kiêm hợp đồng mở và sử dụng Tài khoản thanh toán, dịch vụ ngân
          hàng điện tử và Điều khoản, điều kiện
        </Typography>
      </Typography>
      {open && (
        <Dialog onClose={handleToggle}>
          <DialogHeader onClose={handleToggle}></DialogHeader>
          <DialogBody className={styles["dialog-body"]}>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItem="center"
                  justifyContent="center"
                  className={styles["header"]}
                >
                  <Grid item xs="auto">
                    <Icon
                      className={styles["icon-infor-square"]}
                      component={InforSquare}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={8}>
                  <Typography
                    variant={TypoVariants.subtitle2}
                    weight={TypoWeights.bold}
                    component="div"
                    className={styles["text-center"]}
                  >
                    Đề nghị kiêm hợp đồng
                  </Typography>
                </Box>
              </Grid>
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
                        Đề nghị kiêm hợp đồng mở và sử dụng Tài khoản thanh
                        toán, dịch vụ ngân hàng điện tử và Điều khoản, điều kiện
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* item */}
              <Grid item>
                {/* @ts-ignore */}
                <Box pt={6}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Họ và tên:",
                          description: "Nguyen Van A",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Giới tính:",
                          description: "Nam",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Ngày sinh:",
                          description: "08/08/2009",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Số CMND/CCCD:",
                          description: "250884500",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Ngày cấp:",
                          description: "08/08/2009",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Ngày hết hạn:",
                          description: "08/08/2029",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Nơi cấp:",
                          description: "Cục CS ĐKQL cư trú - DLQG dân cư",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Số CMND cũ:",
                          description: "",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Quốc tịch:",
                          description: "Việt Nam",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Cư trú:",
                          description: "Tạm trú",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Địa chỉ thường trú:",
                          description: "123 Bình Hưng Hòa, P.1, Q.1, TP.HCM",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Địa chỉ hiện tại:",
                          description: "123 Bình Hưng Hòa, P.1, Q.1, TP.HCM",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Số điện thoại:",
                          description: "0913141157",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Email:",
                          description: "abc@gmail.com",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Nghề nghiệp:",
                          description: "Bác sĩ",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Chức vụ:",
                          description: "Giám đốc",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Hôn nhân:",
                          description: "Có gia đình",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Học vấn:",
                          description: "Đại học",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Mức thu nhập:",
                          description: "1,000,000,000 VND",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "Điểm giao dịch:",
                          description: "CN TP.HCM",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: "FATCA:",
                          description: "Không có dấu hiệu Hoa kỳ",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* item */}
              {/* item */}
              <Grid item>
                <Grid container alignItem="center" justifyContent="center">
                  <Grid item xs={4} md={3}>
                    {/* @ts-ignore */}
                    <Box mt={6}>
                      <Button fullWidth onClick={handleToggle}>
                        Đóng
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
};

export default AcceptPolicyPopup;
