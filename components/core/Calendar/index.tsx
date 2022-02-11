import format from 'date-fns/format';
import addYears from 'date-fns/addYears';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import CalendarPicker from '../DateTimeRangePickerBase/Calendar';

import { DATE_FORMAT_DEFAULT, PLACEHOLDER_DEFAULT } from './const';

import styles from './styles.module.scss';
import Input, { InputComponent } from '../Input';
import { BaseComponent, OverrideProps } from '../BaseComponent';
import InputAdornment from '../InputAdornment';
import Icon from '../Icon';
import ChevronTop from 'icons/ChevronTop';
import ChevronBottom from 'icons/ChevronBottom';
import Popover from '../Popover';
import { BackdropVariant } from '../Backdrop';
import Typography, { TypoVariants } from '../Typography';

interface CalendarTypeMap<
  P = {},
  D extends React.ElementType = InputComponent
> {
  props: P & {
    /**
     * Define date value.
     */
    date: Date;
    /**
     * Selected range preview formatter. Check out [date-fns's](https://date-fns.org/docs/format) format option.
     * Default: `dd-MM-yyyy`
     */
    dateDisplayFormat?: string;
    /**
     * Defines minimum date. Disabled earlier dates.
     * Default: 100 years before the current date .
     */
    minDate?: Date;
    /**
     * Defines maximum date. Disabled later dates.
     * Default: 20 years after the current date.
     */
    maxDate?: Date;
    /**
     * The input placeholder.
     */
    placeholder?: String;
    /**
     * Set input read only.
     * Default: false
     */
    readOnly?: boolean;
    /**
     * Set input disabled.
     * Default: false
     */
    disabled?: boolean;
    /**
     * The callback function for date change.
     * Required.
     */
    onChange: (date: Date) => void;
  };
  defaultComponent: D;
}

type CalendarProps<
  D extends React.ElementType = CalendarTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CalendarTypeMap<P, D>, D>;

interface CalendarDefaultProps extends Partial<CalendarProps> {
  date: Date;
  dateDisplayFormat: string;
  placeholder: string;
  showStaticRange: boolean;
  readOnly: boolean;
  months: number;
  minDate: Date;
  maxDate: Date;
  component: React.ElementType;
  label?: string;
}

const defaultProps: CalendarDefaultProps = {
  date: null,
  dateDisplayFormat: DATE_FORMAT_DEFAULT,
  placeholder: PLACEHOLDER_DEFAULT,
  months: 1,
  minDate: startOfDay(addYears(new Date(), -100)),
  maxDate: endOfDay(addYears(new Date(), 20)),
  readOnly: false,
  showStaticRange: true,
  component: Input,
};

export type CalendarComponent = BaseComponent<CalendarTypeMap> & {
  displayName?: string;
};

export const Calendar: CalendarComponent = forwardRef(
  (props: CalendarProps, ref: MutableRefObject<any>) => {
    const {
      // @ts-ignore
      component: Component,
      date,
      dateDisplayFormat,
      // @ts-ignore
      showStaticRange,
      onChange,
      // @ts-ignore
      months,
      minDate,
      maxDate,
      label,
      ...rest
    } = {
      ...defaultProps,
      ...props,
    } as CalendarProps;
    const popperOptions = {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    };

    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [selectionDate, setSelectionDate] = useState(date);
    const [dateValue, setDateValue] = useState('');

    // @TOTO: workaround
    const rangeData = [
      {
        startDate: null,
        endDate: null,
      },
    ];
    const range = {
      startDate: selectionDate || null,
      endDate: selectionDate || null,
    };

    const inputRef = useRef(null);

    const setInputValue = (selectedDate?: Date) => {
      if (!!selectedDate) {
        const dateFormatted = selectedDate
          ? format(selectedDate, dateDisplayFormat)
          : '';

        if (dateFormatted) {
          setDateValue(dateFormatted);
        }
      }
    };

    const handleShowCalendar = () => {
      setIsShowCalendar(!isShowCalendar && !rest.readOnly && !rest.disabled);
    };

    const handleChange = (selectedDate: Date) => {
      setSelectionDate(selectedDate);
    };

    const handleConfirm = () => {
      setInputValue(selectionDate);
      setIsShowCalendar(false);
      onChange(selectionDate);
    };

    const handleCancel = () => {
      if (!date) {
        setSelectionDate(null);
        setDateValue('');
      } else {
        setSelectionDate(date);
      }
      setIsShowCalendar(false);
    };

    const handleReset = () => {
      onChange(null);
      setDateValue('');
      setSelectionDate(null);
    };

    useEffect(() => {
      if (selectionDate) {
        setInputValue(selectionDate);
      }
    }, []);

    const afterInput = useMemo(
      () => (
        <InputAdornment
          size={rest.size}
          className={styles[`addon-size-${rest.size as string}`]}
          onClick={handleShowCalendar}
        >
          <Icon
            className={styles.icon}
            component={isShowCalendar ? ChevronTop : ChevronBottom}
          />
        </InputAdornment>
      ),
      [isShowCalendar]
    );

    return (
      <>
        {label && (
          <Typography
            variant={TypoVariants.body2}
            className={styles.label}
            component="label"
          >
            {label}
          </Typography>
        )}
        <Component
          {...rest}
          value={dateValue}
          readOnly
          onClick={handleShowCalendar}
          ref={ref}
          wrapperRef={inputRef}
          afterInput={afterInput}
        />

        {isShowCalendar && (
          <Popover
            anchorRef={inputRef}
            popperOptions={popperOptions}
            backdrop={BackdropVariant.transparent}
            onClose={handleShowCalendar}
          >
            <CalendarPicker
              hasTime={false}
              date={selectionDate}
              rangeData={rangeData}
              rangeSelected={range}
              showStaticRange={showStaticRange}
              months={1}
              minDate={minDate}
              maxDate={maxDate}
              onChange={handleChange}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onReset={handleReset}
            />
          </Popover>
        )}
      </>
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;
