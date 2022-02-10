import { getLanguage } from 'commons/helpers';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Dialog from 'components/core/Dialog';
import DialogBody from 'components/core/DialogBody';
import DialogHeader from 'components/core/DialogHeader';
import Grid from 'components/core/Grid';
import Icon from 'components/core/Icon';
import Typography, {
  TypoTypes,
  TypoVariants,
  TypoWeights,
} from 'components/core/Typography';
import useScrollBlock from 'hooks/useScrollBlock';
import InforSquare from 'icons/InforSquare';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import resources from 'pages/assets/translate.json';
import React, { useEffect, useState } from 'react';
import { MouseEvent } from 'react';
import AccountDescription from '../AccountDescription';
import styles from './styles.module.scss';

type Props = {};

const AcceptPolicyPopup = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, lang);

  function handleToggle() {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [open]);

  return (
    <>
      <Typography
        variant={TypoVariants.body1}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {t.step33AccountInfor.policy.ireadAndAgree}{' '}
        <Typography
          type={TypoTypes.error}
          variant={TypoVariants.body1}
          className={styles['btn-open-popup']}
          onClick={handleToggle}
        >
          {t.step33AccountInfor.policy.policyTitle}
        </Typography>
      </Typography>
      {open && (
        <Dialog onClose={handleToggle}>
          <DialogHeader onClose={handleToggle}></DialogHeader>
          <DialogBody className={styles['dialog-body']}>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  alignItem="center"
                  justifyContent="center"
                  className={styles['header']}
                >
                  <Grid item xs="auto">
                    <Icon
                      className={styles['icon-infor-square']}
                      component={InforSquare}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {/* @ts-ignore */}
                <Box mt={8}>
                  <Typography
                    variant={TypoVariants.subtitle2}
                    weight={TypoWeights.bold}
                    component="div"
                    className={styles['text-center']}
                  >
                    {t.step33AccountInfor.policy.title}
                  </Typography>
                </Box>
              </Grid>
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
                        {t.step33AccountInfor.policy.desc}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* item */}
              <Grid item>
                {/* @ts-ignore */}
                <Box pt={6}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.fullName}:`,
                          description: 'Nguyen Van A',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.gender}:`,
                          description: 'Nam',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.dateOfBirth}:`,
                          description: '08/08/2009',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.idNumber}:`,
                          description: '250884500',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.dateOfIssue}:`,
                          description: '08/08/2009',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.expireOfIssue}:`,
                          description: '08/08/2029',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.placeOfIssue}:`,
                          description: 'Cục CS ĐKQL cư trú - DLQG dân cư',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.oldIdNumber}:`,
                          description: '',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.nationality}:`,
                          description: 'Việt Nam',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.resident}:`,
                          description: 'Tạm trú',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.permanentAddress}:`,
                          description: '123 Bình Hưng Hòa, P.1, Q.1, TP.HCM',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.currentAddress}:`,
                          description: '123 Bình Hưng Hòa, P.1, Q.1, TP.HCM',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.phoneNumber}:`,
                          description: '0913141157',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.email}:`,
                          description: 'abc@gmail.com',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.career}:`,
                          description: 'Bác sĩ',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.position}:`,
                          description: 'Giám đốc',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.marial}:`,
                          description: 'Có gia đình',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.education}:`,
                          description: 'Đại học',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.income}:`,
                          description: '1,000,000,000 VND',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.branch}:`,
                          description: 'CN TP.HCM',
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <AccountDescription
                        data={{
                          title: `${t.step33AccountInfor.policy.form.fatca}:`,
                          description: 'Không có dấu hiệu Hoa kỳ',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {/* item */}
              {/* item */}
              <Grid item>
                <Grid container alignItem="center" justifyContent="center">
                  <Grid item xs={4} md={3}>
                    {/* @ts-ignore */}
                    <Box mt={6}>
                      <Button fullWidth onClick={handleToggle}>
                        Đóng
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
};

export default AcceptPolicyPopup;
