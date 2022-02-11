import { parseJwt } from "commons/helpers";
import { Box } from "components/core/Box";
import Grid from "components/core/Grid";
import Image from "components/core/Image";
import Paper, { PaperRadius } from "components/core/Paper";
import TabSteps from "components/core/TabSteps";
import StepFinalRegisterSuccesss from "components/HDSS/StepFinalRegisterSuccess";
import _get from "lodash/get";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { STEPS } from "../../components/HDSS/const";
import Context, { IAdditionInfor, IConfirmInfor } from "../../components/HDSS/Context";
import styles from "./styles.module.scss";

function HDSSPage() {
  const [active, setActive] = useState(0);
  const [success, setSuccess] = useState(false);
  const [md5, setMd5] = useState(null);
  const [ekycData, setEkycData] = useState(null);
  const router = useRouter();
  const query = router.query;
  const [confirmInfor, setConfirmInfor] = useState<IConfirmInfor>(null);
  const [additionInfor, setAdditionInfor] = useState<IAdditionInfor>(null);

  useEffect(() => {
    if (!query?.jwt) return;
    const jwtInfo = parseJwt(query.jwt as string);
    console.log(">>>>> jwtInfo", jwtInfo); //TODO: to-remove
  }, []);

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

  const contextValue = {
    confirmInfor,
    setConfirmInfor: (value: IConfirmInfor) => {
      setConfirmInfor(value);
    },
    additionInfor,
    setAdditionInfor: (value: IAdditionInfor) => {
      setAdditionInfor(value);
    },
    ekycData,
    setEkycData: (value: any) => {
      setEkycData(value);
    },
  };

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
                          <Context.Provider value={contextValue}>
                            <Component
                              onNext={handleNext}
                            />
                          </Context.Provider>
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
