import React, { useContext } from 'react';
import Box from 'components/core/Box';
import Button, { ButtonVariants } from 'components/core/Button';
import Grid from 'components/core/Grid';
import TextField from 'components/core/TextField';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import styles from './styles.module.scss';
import { EKYCData } from 'commons/helpers/ekyc';
import { useRouter } from 'next/router';
import { getLanguage } from 'commons/helpers';
import resources from 'pages/assets/translate.json';
import _get from 'lodash/get';
import { Controller, useForm } from 'react-hook-form';
import { EXAMPLE_OCR_DATA, GENDER_OPTIONS } from './const';
import { Select } from 'components/core/Select';
import Option from 'components/core/Option';
import Context from 'pages/hdss/Context';
import _parse from 'date-fns/parse';
import Calendar from 'components/core/Calendar';

type FormValues = {
  fullName: string;
  dateOfBirth: string;
  gender?: string | null;
  idNumber: string;
  idNumberType: string;
  dateOfIssue: string;
  expireOfIssue: string;
  placeOfIssue: string;
  oldIdNumber: string;
  permanentAddress: {
    city: string | null;
    district: string | null;
    ward: string | null;
    apartmentNumber: string | null;
  };
};

interface Props {
  onNext: () => void;
  onReset: () => void;
  ekycData: EKYCData;
}

function Step23ConfirmInformation(props: Props) {
  const { onNext, ekycData, onReset } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, 'step23ConfirmInformation']);
  const globalT = _get(resources, [lang]);
  const context = useContext(Context);

  // TODO: get data from eKYC
  const defaultValues = {
    fullName: EXAMPLE_OCR_DATA.fullNameOcr,
    dateOfBirth: EXAMPLE_OCR_DATA.birthDateOcr,
    gender: EXAMPLE_OCR_DATA.gender || null,
    idNumber: EXAMPLE_OCR_DATA.idNumber,
    idNumberType: EXAMPLE_OCR_DATA.idNumberType,
    dateOfIssue: EXAMPLE_OCR_DATA.dateOfIssueOcr
      ? _parse(EXAMPLE_OCR_DATA.dateOfIssueOcr, 'dd/MM/yyyy', new Date())
      : null,
    expireOfIssue: _parse(
      EXAMPLE_OCR_DATA.expireOfIssueOcr,
      'dd/MM/yyyy',
      new Date()
    ),
    placeOfIssue: EXAMPLE_OCR_DATA.placeOfIssueOcr,
    oldIdNumber: '',
    permanentAddress: {
      city: null,
      district: null,
      ward: null,
      apartmentNumber: null,
    },
  };

  if (EXAMPLE_OCR_DATA.idNumberType === 'CMND') {
    defaultValues.gender = null;
  } else if (EXAMPLE_OCR_DATA.idNumberType === 'CCCD') {
    const placeOfIssue = EXAMPLE_OCR_DATA.placeOfIssueOcr
      .replace('\n', ' ')
      .toLowerCase();
    if (
      placeOfIssue.includes('cục cảnh sát quản lý hành chính về trật tự xã hội')
    ) {
      defaultValues.placeOfIssue = 'Cục CS QLHC về trật tự XH';
    } else if (
      placeOfIssue.includes(
        'Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư'.toLowerCase()
      )
    ) {
      defaultValues.placeOfIssue = 'Cục CS ĐKQL cư trú-DLQG dân cư';
    }
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    register,
  } = useForm<FormValues>({
    defaultValues,
  });
  console.log('>>>>>> errors', errors); //TODO: to-remove
  const watchIdNumberType = watch('idNumberType');
  const watchIdNumber = watch('idNumber');
  const watchDateOfIssue = watch('dateOfIssue');

  function calculateAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function handleValidateDateOfBirth(dateOfBirth: string) {
    const date = _parse(dateOfBirth, 'dd/MM/yyyy', new Date());
    const age = calculateAge(date);
    return age >= 18;
  }

  function handleValidatePastDate(date: Date): boolean {
    const now = new Date();
    return new Date(date).getTime() <= now.getTime();
  }

  function handleValidateFutureDate(date: Date): boolean {
    const now = new Date();
    return new Date(date).getTime() >= now.getTime();
  }

  function renderExpireOfIssueByCondition() {
    /**
     * Note: CMND with length = 9: save default 15 years & hide this field on UI
     * Note: CCCD/CMND with length = 12 & not exist dateOfIssue: save default 50 years & hide this field on UI
     */
    if (
      (watchIdNumberType === 'CMND' && watchIdNumber.length === 9) ||
      ((watchIdNumberType === 'CMND' || watchIdNumberType === 'CCCD') &&
        watchIdNumber.length === 12 &&
        !watchDateOfIssue)
    ) {
      return null;
    }

    return (
      <Controller
        control={control}
        name="expireOfIssue"
        rules={{
          required: true,
          // @ts-ignore
          validate: { mustFutureDate: handleValidateFutureDate },
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          // @ts-ignore
          <Calendar
            label={t.expiredDateOfCMND}
            placeholder={t.expiredDateOfCMND}
            onChange={onChange}
            onBlur={onBlur}
            // @ts-ignore
            date={value}
            value={value}
            ref={ref}
          />
        )}
      />
    );
  }

  function renderOldCMNDByCondition() {
    if (watchIdNumberType === 'CCCD') {
      return (
        <TextField
          label={t.oldCMND}
          placeholder={t.oldCMND}
          {...register('oldIdNumber')}
        />
      );
    }
    return null;
  }

  function handleSubmitForm(value: FormValues) {
    const { setConfirmInfor } = context;
    setConfirmInfor(value);
    onNext();
  }

  // TODO: need validate
  // if (!ekycData) return null;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid container className={styles['root']}>
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
          <Grid container direction="column">
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
                      {t.desc}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              {/* @ts-ignore */}
              <Box mt={6}>
                <Grid container direction="column" spacing={4}>
                  {/* row */}
                  <Grid item>
                    <TextField
                      label={t.fullName}
                      placeholder={t.fullName}
                      {...register('fullName', {
                        required: true,
                        maxLength: 50,
                      })}
                      readOnly
                    />
                    {errors?.fullName?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                    {errors?.fullName?.type === 'maxLength' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.maxLength.replace(
                            '{{length}}',
                            50
                          )}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <TextField
                      label={t.dateOfBirth}
                      placeholder={t.dateOfBirth}
                      {...register('dateOfBirth', {
                        required: true,
                        validate: {
                          minYearOld: handleValidateDateOfBirth,
                        },
                      })}
                      readOnly
                    />
                    {errors?.dateOfBirth?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                    {errors?.dateOfBirth?.type === 'minYearOld' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.minYearOld.replace(
                            '{{num}}',
                            18
                          )}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Controller
                      control={control}
                      name="gender"
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          label={t.gender}
                          placeholder={t.gender}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                        >
                          {GENDER_OPTIONS.map((x) => (
                            <Option value={x.value} key={x.value}>
                              {t.genderValue[x.value]}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors?.gender?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <TextField
                      label={t.cmnd}
                      placeholder={t.cmnd}
                      {...register('idNumber', { required: true })}
                      readOnly
                    />
                    {errors?.idNumber?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Controller
                      control={control}
                      name="dateOfIssue"
                      rules={{
                        required: true,
                        // @ts-ignore
                        validate: { mustPastDate: handleValidatePastDate },
                      }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        // @ts-ignore
                        <Calendar
                          label={t.dateOfCMND}
                          placeholder={t.dateOfCMND}
                          onChange={onChange}
                          onBlur={onBlur}
                          // @ts-ignore
                          date={value}
                          value={value}
                          ref={ref}
                        />
                      )}
                    />
                    {errors?.dateOfIssue?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                    {errors?.dateOfIssue?.type === 'mustPastDate' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.mustPastDate}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    {renderExpireOfIssueByCondition()}
                    {errors?.expireOfIssue?.type === 'required' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.required}
                        </Typography>
                      </Box>
                    )}
                    {errors?.expireOfIssue?.type === 'mustFutureDate' && (
                      // @ts-ignore
                      <Box pt={1}>
                        <Typography
                          type={TypoTypes.error}
                          variant={TypoVariants.caption}
                        >
                          {globalT.form.validation.mustFutureDate}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <TextField
                      label={t.placeOfCMND}
                      placeholder={t.placeOfCMND}
                      {...register('placeOfIssue', {
                        required: true,
                        maxLength: 30,
                      })}
                    />
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>{renderOldCMNDByCondition()}</Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Typography
                      weight={TypoWeights.bold}
                      variant={TypoVariants.body1}
                    >
                      {t.address}
                    </Typography>
                  </Grid>
                  {/* row */}
                  {/* permanentAddress */}
                  {/* row */}
                  <Grid item>
                    <Controller
                      control={control}
                      name="permanentAddress.city"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          label={t.city}
                          placeholder={t.city}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                        >
                          {/* TODO: render options */}
                        </Select>
                      )}
                    />
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Controller
                      control={control}
                      name="permanentAddress.district"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          label={t.district}
                          placeholder={t.district}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                        >
                          {/* TODO: render options */}
                        </Select>
                      )}
                    />
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Controller
                      control={control}
                      name="permanentAddress.ward"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          label={t.ward}
                          placeholder={t.ward}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                        >
                          {/* TODO: render options */}
                        </Select>
                      )}
                    />
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <TextField
                      label={t.apartmentNumber}
                      placeholder={t.apartmentNumber}
                      {...register('permanentAddress.apartmentNumber', {
                        required: true,
                      })}
                    />
                  </Grid>
                  {/* row */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box pt={10}>
            <Grid
              container
              alignItem="center"
              justifyContent="center"
              direction="column"
              spacing={4}
            >
              <Grid item xs={5} md={4}>
                <Button fullWidth type="submit">
                  {t.continue}
                </Button>
              </Grid>
              <Grid item xs={5} md={5}>
                <Button
                  fullWidth
                  variant={ButtonVariants.outlined}
                  onClick={onReset}
                >
                  {t.reset}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
      </Grid>
    </form>
  );
}

export default React.memo(Step23ConfirmInformation);
