import React, { useState } from "react";
import Box from "components/core/Box";
import Button from "components/core/Button";
import Checkbox from "components/core/Checkbox";
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
import { POPUP_DATA } from "./const";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { getLanguage } from "commons/helpers";
import _get from "lodash/get";
import resources from "pages/assets/translate.json";

type Props = {};

const AmericanSignPopup = (props: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "step23ConfirmInformation"]);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <>
      <Typography
        variant={TypoVariants.body1}
        onClick={(e: any) => e.stopPropagation()}
      >
        {t.policyDesc["1"]}{" "}
        <Typography
          type={TypoTypes.error}
          variant={TypoVariants.body1}
          className={styles["btn-open-popup"]}
          onClick={handleToggle}
        >
          {t.policyDesc["2"]}
        </Typography>
        {t.policyDesc["3"]}
      </Typography>
      {open && (
        <Dialog onClose={handleToggle}>
          <DialogHeader onClose={handleToggle}></DialogHeader>
          <DialogBody>
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
                    {t.policy.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={2}>
                  <Grid container spacing={2} direction="column">
                    {POPUP_DATA.map((_, index) => (
                      <Grid item key={index}>
                        <Checkbox
                          checked
                          value={index.toString()}
                          name={`data-${index}`}
                        >
                          <Typography
                            variant={TypoVariants.body1}
                            type={TypoTypes.sub}
                          >
                            {t.policy[x.toString()]}
                          </Typography>
                        </Checkbox>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Grid container alignItem="center" justifyContent="center">
                  <Grid item xs={4} md={3}>
                    {/* @ts-ignore */}
                    <Box mt={6}>
                      <Button fullWidth onClick={handleToggle}>
                        {t.close}
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

export default AmericanSignPopup;
