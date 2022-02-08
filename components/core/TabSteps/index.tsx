import cn from 'classnames';
import React from 'react';
import Grid from '../Grid';
import styles from './styles.module.scss';

interface Props {
  total: number;
  active: number;
  onItemClick: (index: number) => void;
}

const defaultProps = {
  onItemClick: null,
};

const TabSteps = (props: Props) => {
  const { total, active, onItemClick } = { ...defaultProps, ...props };

  function renderItems() {
    const xhtml = [];
    if (total > 0) {
      for (let i = 0; i < total; i++) {
        xhtml.push(
          <Grid
            key={i}
            item
            xs="auto"
            className={cn(styles['item'], {
              [styles['active']]: active >= i,
            })}
            onClick={() => onItemClick(i)}
          />,
        );
      }
    }
    return xhtml;
  }

  return (
    <Grid container className={styles['root']}>
      {renderItems()}
    </Grid>
  );
};

export default TabSteps;
