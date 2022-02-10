import { getLanguage } from 'commons/helpers';
import { PopupNotify } from 'components/commons';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Checkbox from 'components/core/Checkbox';
import Grid from 'components/core/Grid';
import Icon from 'components/core/Icon';
import TextField from 'components/core/TextField';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import DangerCircle from 'icons/DangerCircle';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AcceptPolicyPopup from './AcceptPolicyPopup';
import PasswordPolicyPopup from './PasswordPolicyPopup';
import styles from './styles.module.scss';

type FormValues = {
  password: string;
  confirmPassword: string;
};

type Props = {
  onNext: () => void;
};

const Step3AccountInfor = (props: Props) => {
  const { onNext } = { ...props };
  const [isAccepted, setIsAccepted] = useState(false);
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, lang);

  const [popupNotify, setPopupNotify] = useState({
    open: false,
    desc: '',
  });
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    register,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {},
  });
  const password = useRef({});
  password.current = watch('password', '');
  console.log('>>>>>>> errors', errors); //TODO: to-remove

  function handleAcceptPolicy(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsAccepted(!isAccepted);
  }

  function toggleNotify(desc?: string) {
    setPopupNotify(() => {
      if (desc) {
        return {
          open: true,
          desc,
        };
      }
      return {
        open: false,
        desc: '',
      };
    });
  }

  function handleToggleAcceptPolicy(e) {
    e.preventDefault();
    setIsAcceptPolicy(!isAcceptPolicy);
  }

  function handleSubmitForm(values: FormValues) {
    console.log('>>>> Step24: ', values); //TODO: to-remove
    if (isAcceptPolicy) {
      onNext();
    } else {
      toggleNotify(t.alert.acceptPolicy);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {popupNotify.open && (
        <PopupNotify
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}
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
                  {t.step33AccountInfor.loginInfor}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={6} px={4}>
            <Grid container alignItem="center" justifyContent="center">
              <Grid item>
                <Typography
                  variant={TypoVariants.body1}
                  className={styles['text-center']}
                  component="div"
                >
                  {t.step33AccountInfor.desc}
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
            <Grid container direction="column" spacing={4}>
              {/* row */}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <Typography
                      variant={TypoVariants.body1}
                      weight={TypoWeights.bold}
                    >
                      {t.step33AccountInfor.loginInfor}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    <Icon
                      className={styles['icon-warning']}
                      component={DangerCircle}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* row */}
              <Grid item>
                <TextField
                  label={`${t.step33AccountInfor.password} *`}
                  placeholder={`${t.step33AccountInfor.placeholder.password}`}
                  {...register('password', {
                    required: true,
                    pattern: /^[a-zA-Z0-9!@#$%^&*]{6,}$/,
                  })}
                  type="password"
                />
                {errors?.password?.type === 'required' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.validation.required}
                    </Typography>
                  </Box>
                )}
                {errors?.password?.type === 'pattern' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.validation.passwordPattern}
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item>
                <TextField
                  label={`${t.step33AccountInfor.confirmPassword} *`}
                  placeholder={`${t.step33AccountInfor.placeholder.confirmPassword}`}
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) =>
                      value === password.current || 'passwordNotMatch',
                  })}
                  type="password"
                />
                {errors?.confirmPassword?.type === 'required' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.validation.required}
                    </Typography>
                  </Box>
                )}
                {errors?.confirmPassword?.type === 'validate' &&
                  errors?.confirmPassword?.message === 'passwordNotMatch' && (
                    // @ts-ignore
                    <Box pt={1}>
                      <Typography
                        type={TypoTypes.error}
                        variant={TypoVariants.caption}
                      >
                        {t.form.validation.passwordNotMatch}
                      </Typography>
                    </Box>
                  )}
                {errors?.confirmPassword?.type === 'pattern' && (
                  // @ts-ignore
                  <Box pt={1}>
                    <Typography
                      type={TypoTypes.error}
                      variant={TypoVariants.caption}
                    >
                      {t.form.validation.passwordPattern}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={10}>
            <PasswordPolicyPopup />
          </Box>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={10}>
            <Checkbox
              name="isAcceptPolicy"
              value="yes"
              className={styles['checkbox']}
              checked={isAcceptPolicy}
              onClick={handleToggleAcceptPolicy}
            >
              {/* @ts-ignore */}
              <Box pr={2}>
                <AcceptPolicyPopup />
              </Box>
            </Checkbox>
          </Box>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={10}>
            <Grid container alignItem="center" justifyContent="center">
              <Grid item xs={5} md={4}>
                <Button fullWidth type="submit">
                  {t.step33AccountInfor.button.finished}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
      </Grid>
    </form>
  );
};

export default Step3AccountInfor;
