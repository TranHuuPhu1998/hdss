import { getLanguage, getStatusResponse } from 'commons/helpers';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Grid from 'components/core/Grid';
import TextField from 'components/core/TextField';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as hdssServices from 'services/hdssService';
import styles from './styles.module.scss';

interface Props {
  onNext: () => void;
}

type FormValues = {
  phoneNumber: string;
  email: string;
  ref: string;
};

function Step1PersonalInfor(props: Props) {
  const { onNext } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const [loading, setLoading] = useState(false);
  const t = _get(resources, [lang, 'step1RegisterOnlinePayment']);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      phoneNumber: '123456789',
      email: 'nghiepuit@gmail.com',
      ref: '123123',
    },
  });

  function handleSubmitForm() {
    validateIsAllowRegisterOnlinePayment();
  }

  // TODO: (nghieppp) mock api for verify
  function validateIsAllowRegisterOnlinePayment() {
    setLoading(true);
    hdssServices
      .verifyAllowRegisterOnlinePayment()
      .then((res) => {
        const code = _get(res, 'resultCode');
        const status = getStatusResponse(code, lang);
        if (status.success) {
          onNext();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                  className={styles['text-center']}
                  component="div"
                >
                  {t.title}
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
            <Typography variant={TypoVariants.body1} weight={TypoWeights.bold}>
              {t.form.title}
            </Typography>
          </Box>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={4}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <TextField
                  label={`${t.form.label.phone} *`}
                  placeholder="XXX - XXXX - XXXX"
                  {...register('phoneNumber', { required: true })}
                />
                {errors?.phoneNumber?.type === 'required' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.errors.required}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item>
                <TextField
                  label={`${t.form.label.email} *`}
                  placeholder="XXXXXXXXXX"
                  {...register('email', { required: true })}
                />
                {errors?.email?.type === 'required' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.errors.required}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item>
                <TextField label={`${t.form.label.ref}`} {...register('ref')} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={10}>
            <Grid container alignItem="center" justifyContent="center">
              <Grid item xs={5} md={4}>
                <Button fullWidth loading={loading} disabled={loading}>
                  {t.form.button.submit}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default React.memo(Step1PersonalInfor);
