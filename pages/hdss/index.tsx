import { checkResultEkyc, parseInfoFromEKYC } from "commons/helpers/ekyc";
import { Box } from "components/core/Box";
import Grid from "components/core/Grid";
import Image from "components/core/Image";
import StepFinalRegisterSuccesss from "components/core/OnlinePayment/StepFinalRegisterSuccess";
import Paper, { PaperRadius } from "components/core/Paper";
import TabSteps from "components/core/TabSteps";
import _get from "lodash/get";
import Script from "next/script";
import React, { useState } from "react";
import { STEPS } from "./const";
import styles from "./styles.module.scss";

function HDSSPage() {
  const [active, setActive] = useState(0);
  const [success, setSuccess] = useState(false);
  const [md5, setMd5] = useState(null);
  const [ekycData, setEkycData] = useState(null);

  function handleNext() {
    if (active === 0) {
      validateStep1();
    } else if (active === 1) {
      validateStep2();
    }
    if (active + 1 <= 3) {
      setActive(active + 1);
    }
    // the last - check submit data success to display
    // TODO: check data success
    if (active === 3) {
      setSuccess(true);
    }
  }

  function validateStep1() {}

  function validateStep2() {}

  function handleCallbackAfterReEKYC(ekycData: any) {
    setEkycData(ekycData);
    handleNext();
  }

  const Component: any = STEPS[active].component;
  return (
    <>
      <Script id="lottie-id" src="/asset/js/lottie.min.js" />
      <Script id="jsqr-id" src="/asset/js/jsQR.js" />
      <Script id="vnptbrowser-id" src="/asset/js/VNPTBrowserSDKAppV2.3.3.js" />
      <Script
        id="md5-id"
        src="/asset/js/md5.min.js"
        onLoad={() => {
          const md5 = _get(window, "md5");
          setMd5(md5);
        }}
      />
      <Grid container spacing={2} className={styles["root"]}>
        <Grid item>
          {/* @ts-ignore */}
          <Box px={4}>
            <Image src="/asset/images/logo.png" />
          </Box>
        </Grid>
        <Grid item>
          <div className={styles["banner"]}>
            <Image src="/asset/images/homepage/banner.png" />
          </div>
        </Grid>
        <Grid item>
          <Grid container alignItem="center" justifyContent="center">
            <Grid item xs={12} lg={4}>
              {/* @ts-ignore */}
              <Box px={4} py={0}>
                <Paper
                  radius={PaperRadius.max}
                  className={styles["card-box"]}
                  // @ts-ignore
                  elevation="1"
                >
                  {/* @ts-ignore */}
                  <Box px={4} pt={6} pb={10}>
                    {success ? (
                      <StepFinalRegisterSuccesss />
                    ) : (
                      <Grid container direction="column">
                        {/* tabs */}
                        <Grid item>
                          <Grid
                            container
                            alignItem="center"
                            justifyContent="center"
                          >
                            <Grid item xs="auto">
                              <TabSteps
                                total={4}
                                active={active}
                                onItemClick={() => {}}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* tabs */}
                        <Grid item>
                          <Component
                            onNext={handleNext}
                            onReEKYC={handleCallbackAfterReEKYC}
                            ekycData={ekycData}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HDSSPage;
