import { getLanguage } from 'commons/helpers';
import Box from 'components/core/Box';
import Button, { ButtonVariants } from 'components/core/Button';
import Calendar from 'components/core/Calendar';
import Grid from 'components/core/Grid';
import { InputStatuses } from 'components/core/Input';
import Option from 'components/core/Option';
import { Select } from 'components/core/Select';
import TextField from 'components/core/TextField';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import _parse from 'date-fns/parse';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import {
  ALL_DISTRICT,
  ALL_STATES,
  ALL_WARD,
  GENDER_LIST,
  GENERAL_WARNING,
  TAMPERING,
} from 'components/HDSS/const';
import Context from 'components/HDSS/Context';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EXAMPLE_OCR_DATA } from './const';
import { parseEKYCErrorMessage } from './helper';
import styles from './styles.module.scss';

type FormValues = {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string | null;
  idNumber: string;
  idNumberType: string;
  dateOfIssue: Date;
  expireOfIssue: Date;
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
}

function Step23ConfirmInformation(props: Props) {
  const { onNext, onReset } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, 'step23ConfirmInformation']);
  const globalT = _get(resources, [lang]);
  const context = useContext(Context);
  const { ekycData } = context;
  console.log('>>>>>> ekycData context: ', ekycData); //TODO: to-remove

  // TODO: get data from eKYC
  const defaultValues = {
    fullName: EXAMPLE_OCR_DATA.fullNameOcr,
    dateOfBirth: EXAMPLE_OCR_DATA.birthDateOcr
      ? _parse(EXAMPLE_OCR_DATA.birthDateOcr, 'dd/MM/yyyy', new Date())
      : null,
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
  const watchState = watch('permanentAddress.city');
  const watchDistrict = watch('permanentAddress.district');

  useEffect(() => {
    if (watchState) {
      setValue('permanentAddress.district', null);
      setValue('permanentAddress.ward', null);
    }
  }, [setValue, watchState]);

  useEffect(() => {
    if (watchDistrict) {
      setValue('permanentAddress.ward', null);
    }
  }, [setValue, watchDistrict]);

  function calculateAge(birthday: Date) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  function handleValidateDateOfBirth(date: Date) {
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

  function renderDistrictOptions() {
    let xhtml = null;
    if (!watchState) return null;
    const districts = ALL_DISTRICT.filter((x) => x.state === watchState);
    if (!_isEmpty(districts)) {
      xhtml = districts.map((x) => (
        <Option value={x.value} key={x.value}>
          {x.label}
        </Option>
      ));
    }
    return xhtml;
  }

  function renderWardOptions() {
    let xhtml = null;
    if (!watchState) return null;
    if (!watchDistrict) return null;
    const wards = ALL_WARD.filter(
      (x) => x.state === watchState && x.district === watchDistrict
    );
    if (!_isEmpty(wards)) {
      xhtml = wards.map((x) => (
        <Option value={x.value} key={x.value}>
          {x.label}
        </Option>
      ));
    }
    return xhtml;
  }

  function getEKYCErrorMessage() {
    let result = null;
    if (ekycData) {
      let errMsg = null;
      const generalWarning = _get(ekycData, 'ocr.object.general_warning');
      const tamperingWarning = _get(ekycData, 'ocr.object.tampering.warning');
      if (ekycData?.compare?.object?.msg === 'NOMATCH') {
        errMsg = ekycData?.compare?.object?.result;
      } else if (ekycData?.liveness_card_back?.object?.liveness !== 'success') {
        errMsg = ekycData?.liveness_card_back?.object?.liveness_msg;
      } else if (
        ekycData?.liveness_card_front?.object?.liveness !== 'success'
      ) {
        errMsg = ekycData?.liveness_card_front?.object?.liveness_msg;
      } else if (ekycData?.liveness_face?.object?.liveness !== 'success') {
        errMsg = ekycData?.liveness_face?.object?.liveness_msg;
      } else if (!_isEmpty(generalWarning)) {
        errMsg = parseEKYCErrorMessage(generalWarning, GENERAL_WARNING as any);
      } else if (!_isEmpty(tamperingWarning)) {
        errMsg = parseEKYCErrorMessage(generalWarning, TAMPERING as any);
      }
      result = errMsg;
    }
    return result;
  }

  function getEKYCResult() {
    let errMsg = getEKYCErrorMessage();
    if (errMsg) {
      return {
        status: InputStatuses.error,
        value: errMsg,
        hasError: true,
      };
    }
    return {
      status: InputStatuses.primary,
      value: globalT.form.ekyc.success,
      hasError: false,
    };
  }

  function handleSubmitForm(value: FormValues) {
    const { setConfirmInfor } = context;
    setConfirmInfor(value);
    onNext();
  }

  // TODO: need validate
  // if (!ekycData) return null;

  const ekycResult = getEKYCResult();
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
                      label={globalT.form.ekyc.title}
                      readOnly
                      name="ekycResult"
                      {...getEKYCResult()}
                    />
                  </Grid>
                  {/* row */}
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
                    <Controller
                      control={control}
                      name="dateOfBirth"
                      rules={{
                        required: true,
                        validate: {
                          // @ts-ignore
                          minYearOld: handleValidateDateOfBirth,
                        },
                      }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        // @ts-ignore
                        <Calendar
                          label={t.dateOfBirth}
                          placeholder={t.dateOfBirth}
                          onChange={onChange}
                          onBlur={onBlur}
                          // @ts-ignore
                          date={value}
                          value={value}
                          ref={ref}
                          readOnly
                        />
                      )}
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
                          {GENDER_LIST.map((x) => (
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
                          menuClassName={styles['menu']}
                        >
                          {ALL_STATES.map((x) => (
                            <Option value={x.value} key={x.value}>
                              {x.label}
                            </Option>
                          ))}
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
                          menuClassName={styles['menu']}
                        >
                          {renderDistrictOptions()}
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
                          menuClassName={styles['menu']}
                        >
                          {renderWardOptions()}
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
              {!ekycResult?.hasError && (
                <Grid item xs={5} md={4}>
                  <Button fullWidth type="submit">
                    {t.continue}
                  </Button>
                </Grid>
              )}
              <Grid item xs={6} md={6}>
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
