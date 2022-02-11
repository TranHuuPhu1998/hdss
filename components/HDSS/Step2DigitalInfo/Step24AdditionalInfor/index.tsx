import cn from 'classnames';
import { getLanguage } from 'commons/helpers';
import { EKYCData } from 'commons/helpers/ekyc';
import PopupNotify from 'components/commons/PopupNotify';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Checkbox from 'components/core/Checkbox';
import Collapse from 'components/core/Collapse';
import Grid from 'components/core/Grid';
import Icon from 'components/core/Icon';
import Input from 'components/core/Input';
import InputMoneyFormat from 'components/core/InputMoneyFormat';
import Option from 'components/core/Option';
import { Select } from 'components/core/Select';
import TextField from 'components/core/TextField';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import ChevronTop from 'icons/ChevronTop';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import {
  ALL_BRANCHES,
  ALL_DISTRICT,
  ALL_STATES,
  ALL_WARD,
  CAREER_LIST,
  LITERACYANDMARITAL,
} from 'components/HDSS/const';
import Context from 'components/HDSS/Context';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AmericanSignPopup from './AmericanSignPopup';
import styles from './styles.module.scss';

type FormValues = {
  // currentAddress: string;
  academicLevel: string;
  maritalStatus: string;
  job: string;
  jobPosition: string | null;
  averageIncome: string;
  permanentAddress?: {
    apartmentNumber?: string | null;
    city?: string | null;
    district?: string | null;
    ward?: string | null;
  };
  tradingPoint: {
    city: string | null;
    district: string | null;
    branch: string | null;
  };
};

interface Props {
  onNext: () => void;
  ekycData: EKYCData;
}

function Step24AdditionalInfor(props: Props) {
  const { onNext, ekycData } = { ...props };
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, 'step23ConfirmInformation']);
  const globalT = _get(resources, [lang]);

  const [isOpenPersonalInfor, setOpenPersonalInfor] = useState(true);
  const [isOpenJobInfor, setOpenJobInfor] = useState(true);
  const [isOpenContactInfor, setOpenContactInfor] = useState(true);
  const [popupNotify, setPopupNotify] = useState({
    open: false,
    desc: '',
  });
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);

  const context = useContext(Context);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    register,
  } = useForm<FormValues>({
    defaultValues: {},
  });
  console.log('>>>>>>> errors', errors); //TODO: to-remove

  const watchCareer = watch('job');
  const watchAverageIncome = watch('averageIncome');
  const watchState = watch('permanentAddress.city');
  const watchDistrict = watch('permanentAddress.district');
  const watchTradingPointState = watch('tradingPoint.city');
  const watchTradingPointDistrict = watch('tradingPoint.district');

  useEffect(() => {
    if (watchCareer) {
      setValue('jobPosition', null);
    }
  }, [watchCareer]);

  useEffect(() => {
    if (watchState) {
      setValue('permanentAddress.district', null);
      setValue('permanentAddress.ward', null);
    }
  }, [watchState]);

  useEffect(() => {
    if (watchDistrict) {
      setValue('permanentAddress.ward', null);
    }
  }, [watchDistrict]);

  useEffect(() => {
    if (watchTradingPointState) {
      setValue('tradingPoint.district', null);
      setValue('tradingPoint.branch', null);
    }
  }, [watchTradingPointState]);

  useEffect(() => {
    if (watchTradingPointDistrict) {
      setValue('tradingPoint.branch', null);
    }
  }, [watchTradingPointDistrict]);

  function togglePersonalInfor() {
    setOpenPersonalInfor(!isOpenPersonalInfor);
  }

  function toggleJobInfor() {
    setOpenJobInfor(!isOpenJobInfor);
  }

  function toggleContactInfor() {
    setOpenContactInfor(!isOpenContactInfor);
  }

  function renderJobPositionOptions() {
    let xhtml = null;
    if (watchCareer) {
      const positions = (CAREER_LIST.listPosition || []).filter(
        (x) => x.careerId === watchCareer
      );
      if (!_isEmpty(positions)) {
        xhtml = positions.map((pos) => (
          <Option key={pos.value} value={pos.value}>
            {pos.label}
          </Option>
        ));
      }
    }
    return xhtml;
  }

  function handleToggleAcceptPolicy(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setIsAcceptPolicy(!isAcceptPolicy);
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

  function renderTradingPointDistrictOptions() {
    let xhtml = null;
    if (!watchTradingPointState) return null;
    const districts = ALL_DISTRICT.filter(
      (x) => x.state === watchTradingPointState
    );
    if (!_isEmpty(districts)) {
      xhtml = districts.map((x) => (
        <Option value={x.value} key={x.value}>
          {x.label}
        </Option>
      ));
    }
    return xhtml;
  }

  function renderTradingPointBranchOptions() {
    let xhtml = null;
    if (!watchTradingPointState) return null;
    if (!watchTradingPointDistrict) return null;
    const branchs = ALL_BRANCHES.filter(
      (x) =>
        x.state === watchTradingPointState &&
        x.district === watchTradingPointDistrict
    );
    if (!_isEmpty(branchs)) {
      xhtml = branchs.map((x) => (
        <Option value={x.value} key={x.value}>
          {x.label}
        </Option>
      ));
    }
    return xhtml;
  }

  function handleSubmitForm(values: FormValues) {
    console.log('>>>> Step24: ', values); //TODO: to-remove
    if (isAcceptPolicy) {
      const { setAdditionInfor } = context;
      setAdditionInfor(values);
      onNext();
    } else {
      toggleNotify(globalT.alert.acceptPolicy);
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
                  {t.additionalInfor}
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
              <Box mt={6}>
                <Grid container direction="column" spacing={4}>
                  {/* personal information */}
                  {/* row */}
                  <Grid item>
                    <Grid
                      container
                      justifyContent="space-between"
                      onClick={togglePersonalInfor}
                    >
                      <Grid item xs="auto">
                        <Typography
                          variant={TypoVariants.body1}
                          weight={TypoWeights.bold}
                        >
                          {t.personalInfor}
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Icon
                          className={cn(styles['collapse-icon'], {
                            [styles['icon-close']]: !isOpenPersonalInfor,
                          })}
                          component={ChevronTop}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* row */}
                  {/* personal information */}
                  {/* row */}
                  <Grid item>
                    <Collapse in={isOpenPersonalInfor}>
                      <Grid container spacing={4}>
                        {/* row */}
                        {/* <Grid item>
                          <TextField
                            autoComplete="off"
                            label={t.currentAddress}
                            placeholder={t.currentAddress}
                            {...register("currentAddress", { required: true })}
                          />
                        </Grid> */}
                        {/* row */}
                        {/* row */}
                        <Grid item>
                          <Controller
                            control={control}
                            name="academicLevel"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                label={t.academicLevel}
                                placeholder="&nbsp;"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                              >
                                {LITERACYANDMARITAL.literacy.map((x) => (
                                  <Option key={x.value} value={x.value}>
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
                            name="maritalStatus"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                label={t.maritalStatus}
                                placeholder="&nbsp;"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                              >
                                {LITERACYANDMARITAL.marital.map((x) => (
                                  <Option key={x.value} value={x.value}>
                                    {x.label}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          />
                        </Grid>
                        {/* row */}
                      </Grid>
                    </Collapse>
                  </Grid>
                  {/* row */}
                  {/* job infor */}
                  {/* row */}
                  <Grid item>
                    <Grid
                      container
                      justifyContent="space-between"
                      onClick={toggleJobInfor}
                    >
                      <Grid item xs="auto">
                        <Typography
                          variant={TypoVariants.body1}
                          weight={TypoWeights.bold}
                        >
                          {t.jobInformation}
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Icon
                          className={cn(styles['collapse-icon'], {
                            [styles['icon-close']]: !isOpenJobInfor,
                          })}
                          component={ChevronTop}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Collapse in={isOpenJobInfor}>
                      <Grid container spacing={4}>
                        {/* row */}
                        <Grid item>
                          <Controller
                            control={control}
                            name="job"
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                label={t.job}
                                placeholder="&nbsp;"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                menuClassName={styles['career-select']}
                              >
                                {CAREER_LIST.listCareer.map((x) => (
                                  <Option key={x.value} value={x.value}>
                                    {x.label}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          />
                          {errors?.job?.type === 'required' && (
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
                            name="jobPosition"
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                label={t.jobPosition}
                                placeholder="&nbsp;"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                              >
                                {renderJobPositionOptions()}
                              </Select>
                            )}
                          />
                          {errors?.jobPosition?.type === 'required' && (
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
                          {/* @ts-ignore */}
                          <Grid container direction="column" spacing={2}>
                            <Grid item className={styles.label}>
                              {/* @ts-ignore */}
                              <Box ml={5}>{t.averageIncome}</Box>
                            </Grid>
                            <Grid item>
                              <Controller
                                control={control}
                                name="averageIncome"
                                rules={{
                                  maxLength: 15,
                                }}
                                render={({
                                  field: { onChange, onBlur, value, ref },
                                }) => (
                                  // @ts-ignore
                                  <Input
                                    component={InputMoneyFormat}
                                    onValueChange={(values: any) => {
                                      const { value } = values;
                                      onChange(value);
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                  />
                                )}
                              />
                              {errors?.averageIncome?.type === 'maxLength' && (
                                // @ts-ignore
                                <Box pt={1}>
                                  <Typography
                                    type={TypoTypes.error}
                                    variant={TypoVariants.caption}
                                  >
                                    {globalT.form.validation.maxLength.replace(
                                      '{{length}}',
                                      15
                                    )}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* row */}
                      </Grid>
                    </Collapse>
                  </Grid>
                  {/* row */}
                  {/* job infor */}
                  {/* contact infor */}
                  {/* row */}
                  <Grid item>
                    <Grid
                      container
                      justifyContent="space-between"
                      onClick={toggleContactInfor}
                    >
                      <Grid item xs="auto">
                        <Typography
                          variant={TypoVariants.body1}
                          weight={TypoWeights.bold}
                        >
                          {t.communications}
                        </Typography>
                      </Grid>
                      <Grid item xs="auto">
                        <Icon
                          className={cn(styles['collapse-icon'], {
                            [styles['icon-close']]: !isOpenContactInfor,
                          })}
                          component={ChevronTop}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* row */}
                  {/* row */}
                  <Grid item>
                    <Collapse in={isOpenContactInfor}>
                      <Grid container spacing={4}>
                        {/* row */}
                        <Grid item>
                          <TextField
                            label={t.residentialAddress}
                            {...register('permanentAddress.apartmentNumber', {
                              required: true,
                            })}
                          />
                          {errors?.permanentAddress?.apartmentNumber?.type ===
                            'required' && (
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
                            name="permanentAddress.city"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
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
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
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
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
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
                          <Controller
                            control={control}
                            name="tradingPoint.city"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                label={t.tradingPoint}
                                placeholder={t.tradingPoint}
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
                            name="tradingPoint.district"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                placeholder={t.district}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                menuClassName={styles['menu']}
                              >
                                {renderTradingPointDistrictOptions()}
                              </Select>
                            )}
                          />
                        </Grid>
                        {/* row */}
                        {/* row */}
                        <Grid item>
                          <Controller
                            control={control}
                            name="tradingPoint.branch"
                            render={({
                              field: { onChange, onBlur, value, ref },
                            }) => (
                              <Select
                                placeholder={t.branch}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                menuClassName={styles['menu']}
                              >
                                {renderTradingPointBranchOptions()}
                              </Select>
                            )}
                          />
                        </Grid>
                        {/* row */}
                      </Grid>
                    </Collapse>
                  </Grid>
                  {/* row */}
                  {/* contact infor */}
                  <Grid item>
                    <Checkbox
                      name="isAcceptPolicy"
                      value="yes"
                      className={styles['checkbox']}
                      checked={isAcceptPolicy}
                      onClick={handleToggleAcceptPolicy}
                    >
                      {/* @ts-ignore */}
                      <Box pr={2}>
                        <AmericanSignPopup />
                      </Box>
                    </Checkbox>
                  </Grid>
                </Grid>
                {/* row */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* item */}
        {/* item */}
        <Grid item>
          {/* @ts-ignore */}
          <Box mt={10}>
            <Grid
              container
              alignItem="center"
              justifyContent="center"
              direction="column"
              spacing={4}
            >
              <Grid item xs={5} md={4}>
                {/* @ts-ignore */}
                <Box mt={10}>
                  <Button fullWidth type="submit">
                    {t.continue}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* item */}
      </Grid>
    </form>
  );
}

export default React.memo(Step24AdditionalInfor);
