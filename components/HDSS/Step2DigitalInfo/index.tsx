import React, { useState } from 'react';
import Grid from 'components/core/Grid';
import styles from './styles.module.scss';
import Step21VerifyID from './Step21VerifyID';
import Step23ConfirmInformation from './Step23ConfirmInformation';
import Step24AdditionalInfor from './Step24AdditionalInfor';

const STEP2_VERIFY_STEPS = [
  {
    component: Step21VerifyID,
  },
  {
    component: Step23ConfirmInformation,
  },
  {
    component: Step24AdditionalInfor,
  },
];

interface Props {
  onNext: () => void;
}

/**
 * Step 0: Verify CMND / CCCD
 */
const DEFAULT_CONFIRMATION_STEP = 1;
function Step2DigitalInfo(props: Props) {
  const { onNext, ...rest } = { ...props };
  const [active, setActive] = useState(DEFAULT_CONFIRMATION_STEP);

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
    <Grid container className={styles['root']}>
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
