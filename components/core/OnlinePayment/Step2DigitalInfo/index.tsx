import React, { useState } from 'react';
import Grid from 'components/core/Grid';
import { STEP2_VERIFY_STEPS } from './const';
import styles from './styles.module.scss';

interface Props {
  onNext: () => void;
}

function Step2DigitalInfo(props: Props) {
  const { onNext, ...rest } = { ...props };
  const [active, setActive] = useState(0);

  function handleNext() {
    if (active + 1 <= 3) {
      setActive(active + 1);
    }
    // in last step
    if (active === 3) {
      if (onNext) {
        onNext();
      }
    }
  }

  const Component = STEP2_VERIFY_STEPS[active].component;
  return (
    <Grid container className={styles['root']}>
      {/* item */}
      <Grid item>
        {/* @ts-ignore */}
        <Component onNext={handleNext} {...rest} />
      </Grid>
      {/* item */}
    </Grid>
  );
}

export default React.memo(Step2DigitalInfo);
