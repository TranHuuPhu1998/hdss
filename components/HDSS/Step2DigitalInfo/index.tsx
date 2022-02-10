import React, { useState } from "react";
import Grid from "components/core/Grid";
import { STEP2_VERIFY_STEPS } from "./const";
import styles from "./styles.module.scss";

interface Props {
  onNext: () => void;
}

function Step2DigitalInfo(props: Props) {
  const { onNext, ...rest } = { ...props };
  const [active, setActive] = useState(2);

  function handleNext() {
    if (active + 1 <= 2) {
      setActive(active + 1);
    }
    // in last step
    if (active === 2) {
      if (onNext) {
        onNext();
      }
    }
  }

  // handle reset at step confirm information > back to prev step
  function handleReset() {
    setActive(active - 1);
  }

  const Component = STEP2_VERIFY_STEPS[active].component;
  return (
    <Grid container className={styles["root"]}>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Component onNext={handleNext} onReset={handleReset} {...rest} />
      </Grid>
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step2DigitalInfo);
