import addYears from 'date-fns/addYears';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import isValid from 'date-fns/isValid';

import _get from 'lodash-es/get';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import DateRangePicker from '../DateTimeRangePickerBase/DateRangePicker';
import Icon from '../Icon';
import Input, { InputComponent } from '../Input';
import InputAdornment from '../InputAdornment';
import Popover from '../Popover';

import { BackdropVariant } from '../Backdrop';
import {
  DATE_FORMAT_DEFAULT,
  PLACEHOLDER_DEFAULT,
  SELECTION_KEY,
  TIME_FORMAT_DEFAULT,
} from './const';
import ChevronTop from 'icons/ChevronTop';
import ChevronBottom from 'icons/ChevronBottom';

interface DateTimeRangePickerTypeMap<
  P = {},
  D extends React.ElementType = InputComponent
> {
  props: P & {
    /**
     * Define date range, it is object {startDate: Date, endDate: Date}.
     */
    range: DateRange;
    /**
     * The string help separate between two dates in input.
     * Default `-`
     * Required.
     */
    separate?: string;
    /**
     * Selected range preview formatter. Check out [date-fns's](https://date-fns.org/docs/format) format option.
     * Default: `dddd-MM-yyy`
     */
    dateDisplayFormat?: string;
    /**
     * Show/hide the time picker and time format in range preview.
     */
    hasTime?: boolean;
    /**
     * Rendered month count.
     * Default: `2`
     */
    months?: number;
    /**
     * Show/hide the block static range.
     * Default: `true`
     */
    showStaticRange?: boolean;
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
     * The callback function for date changes.
     * Required.
     */
    onChange: (range: DateRange) => void;
    /**
     * The callback function for preview changes.
     */
    onPreviewChange?: (range: DateRange) => void;
  };
  defaultComponent: D;
}

interface DateRange {
  key?: string;
  startDate: Date;
  endDate: Date;
}

interface DateRangeParam {
  [SELECTION_KEY]: DateRange;
}

type DateTimeRangePickerProps<
  D extends React.ElementType = DateTimeRangePickerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DateTimeRangePickerTypeMap<P, D>, D>;

interface DateTimeRangePickerDefaultProps
  extends Partial<DateTimeRangePickerProps> {
  component: React.ElementType;
}

const defaultProps: DateTimeRangePickerDefaultProps = {
  dateDisplayFormat: `${TIME_FORMAT_DEFAULT} ${DATE_FORMAT_DEFAULT}`,
  separate: '-',
  hasTime: false,
  placeholder: PLACEHOLDER_DEFAULT,
  months: 2,
  showStaticRange: true,
  minDate: startOfDay(addYears(new Date(), -100)),
  maxDate: endOfDay(addYears(new Date(), 20)),
  readOnly: false,
  component: Input,
};

export type DateTimeRangePickerComponent =
  BaseComponent<DateTimeRangePickerTypeMap> & {
    displayName?: string;
  };

export const DateTimeRangePicker: DateTimeRangePickerComponent = forwardRef(
  (props: DateTimeRangePickerProps, ref: MutableRefObject<any>) => {
    const {
      component: Component,
      range,
      dateDisplayFormat,
      onChange,
      onPreviewChange,
      hasTime,
      months,
      showStaticRange,
      separate,
      minDate,
      maxDate,
      ...rest
    } = {
      ...defaultProps,
      ...props,
    };
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
    const [selectionRange, setSelectionRange] = useState({
      startDate: _get(range, ['startDate'], null),
      endDate: _get(range, ['endDate'], null),
    });
    const [dateRangeValue, setDateRangeValue] = useState('');

    const inputRef = useRef(null);
    const rangeData: DateRange[] = [
      {
        ...selectionRange,
        key: SELECTION_KEY,
      },
    ];

    const setInputValue = (startDate, endDate) => {
      const nextDateDisplayFormat = hasTime
        ? dateDisplayFormat
        : DATE_FORMAT_DEFAULT;
      const startDateFormatted = isValid(startDate)
        ? format(startDate, nextDateDisplayFormat)
        : '';
      const endDateFormatted = isValid(endDate)
        ? format(endDate, nextDateDisplayFormat)
        : '';

      if (startDateFormatted || endDateFormatted) {
        setDateRangeValue(
          `${startDateFormatted} ${separate} ${endDateFormatted}`
        );
      }
    };

    const handleShowCalendar = () => {
      setIsShowCalendar(!isShowCalendar && !rest.readOnly && !rest.disabled);
    };

    const handleChange = (data: DateRangeParam) => {
      const nextData = {
        ...data[SELECTION_KEY],
        key: SELECTION_KEY,
      };

      const nextSelectionRange = { ...selectionRange, ...nextData };

      setSelectionRange(nextSelectionRange);

      if (onPreviewChange instanceof Function) {
        onPreviewChange(nextSelectionRange);
      }
    };

    const handleConfirm = () => {
      setInputValue(selectionRange.startDate, selectionRange.endDate);
      setIsShowCalendar(false);
      onChange(selectionRange);

      if (!selectionRange.startDate && !selectionRange.endDate) {
        setDateRangeValue('');
      }
    };

    const handleCancel = () => {
      if (!range.startDate || !range.endDate) {
        setSelectionRange({
          startDate: null,
          endDate: null,
        });
        setDateRangeValue('');
      } else {
        setSelectionRange({
          startDate: range.startDate,
          endDate: range.endDate,
        });
      }
      setIsShowCalendar(false);
    };

    const handleReset = () => {
      const nextSelectionRange = { startDate: null, endDate: null };

      setSelectionRange(nextSelectionRange);
    };

    useEffect(() => {
      if (!!range.startDate && !!range.endDate) {
        setSelectionRange({
          startDate: range.startDate,
          endDate: range.endDate,
        });
        setInputValue(range.startDate, range.endDate);
      }
    }, [range]);

    return (
      <>
        <Component
          {...rest}
          value={dateRangeValue}
          readOnly
          onClick={handleShowCalendar}
          ref={ref}
          wrapperRef={inputRef}
          afterInput={
            <InputAdornment onClick={handleShowCalendar}>
              <Icon>{isShowCalendar ? <ChevronTop /> : <ChevronBottom />}</Icon>
            </InputAdornment>
          }
        />

        {isShowCalendar && (
          <Popover
            anchorRef={inputRef}
            popperOptions={popperOptions}
            backdrop={BackdropVariant.transparent}
            onClose={handleShowCalendar}
          >
            <DateRangePicker
              ranges={rangeData}
              rangeSelected={range}
              hasTime={hasTime}
              months={months}
              showStaticRange={showStaticRange}
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

DateTimeRangePicker.displayName = 'DateTimeRangePicker';

export default DateTimeRangePicker;
