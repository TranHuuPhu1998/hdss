import React from 'react';
import Grid from 'components/core/Grid';
import Typography, {
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';

interface iDescription {
  title: string;
  description: string;
}

interface Props {
  data: iDescription;
}

const AccountDescription = (props: Props) => {
  const { data } = { ...props };
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography weight={TypoWeights.bold} vaiant={TypoVariants.body1}>
          {data.title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography vaiant={TypoVariants.body1}>{data.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default AccountDescription;
