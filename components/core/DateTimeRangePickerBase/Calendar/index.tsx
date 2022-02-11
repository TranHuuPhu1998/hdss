import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import differenceInDays from "date-fns/differenceInDays";
import format from "date-fns/format";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import isValid from "date-fns/isValid";
import defaultLocale from "date-fns/locale/vi";
import max from "date-fns/max";
import min from "date-fns/min";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import subMonths from "date-fns/subMonths";
import ArrowRight from "icons/ArrowRight";
import ChevronLeft from "icons/ChevronLeft";
import ChevronRight from "icons/ChevronRight";
import RotateCcw from "icons/RotateCcw";
import React, { PureComponent } from "react";
import cx from "../../../../utils/classnames";
import Button, { ButtonSizes, ButtonVariants } from "../../Button";
import Grid from "../../Grid";
import { InputSizes } from "../../Input";
import Option from "../../Option";
import Select from "../../Select";
import Month from "../Month";
import { calcFocusDate, getMonthDisplayRange } from "../utils";
import styles from "./styles.module.scss";

class Calendar extends PureComponent<any, any> {
  dateOptions = {};
  listSizeCache = {};
  // @ts-ignore
  state;
  list;

  static defaultProps = {
    showMonthArrow: true,
    showMonthAndYearPickers: true,
    disabledDates: [],
    locale: defaultLocale,
    ranges: [],
    focusedRange: [0, 0],
    dateDisplayFormat: "dd/MM/yyyy - HH:mm",
    monthDisplayFormat: "M, yyyy",
    showDateDisplay: true,
    showPreview: true,
    displayMode: "date",
    months: 1,
    color: "#3d91ff",
    scroll: {
      enabled: false,
    },
    direction: "horizontal",
    maxDate: addYears(new Date(), 20),
    minDate: addYears(new Date(), -100),
    rangeColors: ["#3d91ff", "#3ecf8e", "#fed14c"],
    dragSelectionEnabled: true,
  };

  constructor(props, context) {
    super(props, context);
    this.changeShownDate = this.changeShownDate.bind(this);
    this.focusToDate = this.focusToDate.bind(this);
    this.updateShownDate = this.updateShownDate.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.onDragSelectionStart = this.onDragSelectionStart.bind(this);
    this.onDragSelectionEnd = this.onDragSelectionEnd.bind(this);
    this.onDragSelectionMove = this.onDragSelectionMove.bind(this);
    this.renderMonthAndYear = this.renderMonthAndYear.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.estimateMonthSize = this.estimateMonthSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderHour = this.renderHour.bind(this);
    this.renderMinute = this.renderMinute.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.renderConfirmDate = this.renderConfirmDate.bind(this);
    this.dateOptions = { locale: props.locale };

    this.listSizeCache = {};
    this.state = {
      focusedDate: calcFocusDate(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false,
      },
      scrollArea: this.calcScrollArea(props),
      isReset: false,
    };
  }

  calcScrollArea(props) {
    const { direction, months, scroll } = props;
    if (!scroll.enabled) return { enabled: false };

    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    if (direction === "vertical") {
      return {
        enabled: true,
        monthHeight: scroll.monthHeight || 220,
        longMonthHeight: longMonthHeight || 260,
        calendarWidth: "auto",
        calendarHeight:
          (scroll.calendarHeight || longMonthHeight || 240) * months,
      };
    }
    return {
      enabled: true,
      monthWidth: scroll.monthWidth || 332,
      calendarWidth:
        (scroll.calendarWidth || scroll.monthWidth || 332) * months,
      monthHeight: longMonthHeight || 300,
      calendarHeight: longMonthHeight || 300,
    };
  }

  focusToDate(date, props = this.props, preventUnnecessary = true) {
    if (!props.scroll.enabled) {
      this.setState({ focusedDate: date });
      return;
    }
    const targetMonthIndex = differenceInCalendarMonths(date, props.minDate);
    const visibleMonths = this.list.getVisibleRange();
    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
    this.list.scrollTo(targetMonthIndex);
    this.setState({ focusedDate: date });
  }

  updateShownDate(props = this.props) {
    const newProps = props.scroll.enabled
      ? {
          ...props,
          months: this.list.getVisibleRange().length,
        }
      : props;
    const { focusedDate } = this.state;
    const _focusedDate = isValid(focusedDate) ? focusedDate : new Date();
    const newFocus = calcFocusDate(_focusedDate, newProps);
    this.focusToDate(newFocus, newProps);
  }

  updatePreview(val) {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const preview = {
      startDate: val,
      endDate: val,
      color: this.props.color,
    };
    this.setState({ preview });
  }

  componentDidMount() {
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      setTimeout(() => this.focusToDate(this.state.focusedDate), 1);
    }
  }

  // eslint-disable-next-line react/no-deprecated
  UNSAFE_componentWillReceiveProps(nextProps) {
    const propMapper = {
      dateRange: "ranges",
      date: "date",
    };
    const targetProp = propMapper[nextProps.displayMode];
    if (this.props.locale !== nextProps.locale) {
      this.dateOptions = { locale: nextProps.locale };
    }
    if (
      JSON.stringify(this.props.scroll) !== JSON.stringify(nextProps.scroll)
    ) {
      this.setState({ scrollArea: this.calcScrollArea(nextProps) });
    }
    if (nextProps[targetProp] !== this.props[targetProp]) {
      this.updateShownDate(nextProps);
    }
  }

  changeShownDate(value, mode = "set") {
    const { focusedDate } = this.state;
    const { onShownDateChange, minDate, maxDate } = this.props;
    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
      set: () => value,
    };
    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    this.focusToDate(newDate, this.props, false);

    if (typeof onShownDateChange === "function") {
      onShownDateChange(newDate);
    }
  }

  handleRangeFocusChange(rangesIndex, rangeItemIndex) {
    if (typeof this.props.onRangeFocusChange === "function") {
      this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    }
  }

  handleScroll() {
    const { onShownDateChange, minDate } = this.props;
    const visibleMonths = this.list.getVisibleRange();
    // prevent scroll jump with wrong visible value
    if (visibleMonths[0] === undefined) return;
    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(
      visibleMonth,
      this.state.focusedDate
    );
    if (isFocusedToDifferent) {
      this.setState({ focusedDate: visibleMonth });

      if (typeof onShownDateChange === "function") {
        onShownDateChange(visibleMonth);
      }
    }
  }

  renderMonthAndYear(focusedDate, changeShownDate, props) {
    const { showMonthArrow, minDate, maxDate } = props;
    const upperYearLimit = (
      maxDate || Calendar.defaultProps.maxDate
    ).getFullYear();
    const lowerYearLimit = (
      minDate || Calendar.defaultProps.minDate
    ).getFullYear();

    return (
      <Grid
        container
        spacing={2}
        onMouseUp={(e) => e.stopPropagation()}
        className={styles.monthAndYearWrapper}
      >
        <Grid
          item
          xs={6}
          container
          justifyContent="space-between"
          alignItem="center"
        >
          {showMonthArrow && (
            <Button
              fullWidth={false}
              variant={ButtonVariants.secondary}
              size={ButtonSizes.sm}
              icon={ChevronLeft}
              onClick={() => changeShownDate(-1, "monthOffset")}
            />
          )}

          <Select
            value={focusedDate.getMonth()}
            onChange={(value) => changeShownDate(value, "setMonth")}
            size={InputSizes.sm}
            className={styles.monthAndYearSelect}
            menuClassName={styles.monthAndYearSelectMenu}
          >
            {new Array(12).fill(null).map((_, month) => {
              const monthName = month + 1;

              return (
                <Option key={month} value={month} size={InputSizes.sm}>
                  {`Tháng ${monthName}`}
                </Option>
              );
            })}
          </Select>
        </Grid>

        <Grid
          item
          xs={6}
          container
          justifyContent="space-between"
          alignItem="center"
        >
          <Select
            value={focusedDate.getFullYear()}
            onChange={(value) => changeShownDate(value, "setYear")}
            size={InputSizes.sm}
            className={styles.monthAndYearSelect}
            menuClassName={styles.monthAndYearSelectMenu}
          >
            {new Array(upperYearLimit - lowerYearLimit + 1)
              .fill(upperYearLimit)
              .map((val, i) => {
                const year = val - i;
                return (
                  <Option key={year} value={year} size={InputSizes.sm}>
                    {`Năm ${year}`}
                  </Option>
                );
              })}
          </Select>
          {showMonthArrow && (
            <Button
              fullWidth={false}
              variant={ButtonVariants.secondary}
              size={ButtonSizes.sm}
              icon={ChevronRight}
              onClick={() => changeShownDate(+1, "monthOffset")}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  onDragSelectionStart(date) {
    const { onChange, dragSelectionEnabled } = this.props;

    if (dragSelectionEnabled) {
      this.setState({
        drag: {
          status: true,
          range: { startDate: date, endDate: date },
          disablePreview: true,
        },
      });
    } else {
      if (typeof onChange === "function") {
        onChange(date);
      }
    }
  }

  onDragSelectionEnd(date) {
    const { updateRange, displayMode, onChange, dragSelectionEnabled } =
      this.props;

    if (!dragSelectionEnabled) return;

    if (displayMode === "date" || !this.state.drag.status) {
      if (typeof onChange === "function") {
        onChange(date);
      }
      return;
    }
    const newRange = {
      startDate: this.state.drag.range.startDate,
      endDate: date,
    };
    if (displayMode !== "dateRange" || isSameDay(newRange.startDate, date)) {
      this.setState({ drag: { status: false, range: {} } }, () => {
        if (typeof onChange === "function") {
          onChange(date);
        }
      });
    } else {
      this.setState({ drag: { status: false, range: {} } }, () => {
        if (typeof updateRange === "function") {
          updateRange(newRange);
        }
      });
    }
  }

  onDragSelectionMove(date) {
    const { drag } = this.state;
    if (!drag.status || !this.props.dragSelectionEnabled) return;
    this.setState({
      drag: {
        status: drag.status,
        range: { startDate: drag.range.startDate, endDate: date },
        disablePreview: true,
      },
    });
  }

  estimateMonthSize(index, cache = null) {
    const { direction, minDate } = this.props;
    const { scrollArea } = this.state;
    if (cache) {
      this.listSizeCache = cache;
      if (cache[index]) return cache[index];
    }
    if (direction === "horizontal") return scrollArea.monthWidth;
    const monthStep = addMonths(minDate, index);
    const { start, end } = getMonthDisplayRange(monthStep, this.dateOptions);
    const isLongMonth = differenceInDays(end, start) + 1 > 7 * 5;
    return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
  }

  formatDateDisplay(date, defaultText, dateFormat = "dd/MM/yyyy") {
    if (!isValid(date)) return defaultText;
    return format(date, dateFormat, this.dateOptions);
  }

  getTimeFromDate(type, date) {
    if (!date) {
      return 0;
    }

    if (type === "hour") {
      return getHours(date);
    } else {
      return getMinutes(date);
    }
  }

  renderHour(type) {
    const { ranges } = this.props;
    const dateSelected =
      type === "startHour" ? ranges[0].startDate : ranges[0].endDate;
    const isDisabled =
      (type === "startHour" && !ranges[0].startDate) ||
      (type === "endHour" && !ranges[0].endDate);
    const hourFormatted = this.getTimeFromDate("hour", dateSelected);

    return (
      <Select
        className={styles.hourSelect}
        name={type}
        value={hourFormatted}
        disabled={isDisabled}
        onChange={(value) => this.onChangeTime(type, value)}
        size={InputSizes.xs}
        menuClassName={styles.hourAndMinuteSelectMenu}
      >
        {new Array(24).fill(null).map((_, hour) => {
          const hourText = hour < 10 ? `0${hour}` : `${hour}`;

          return (
            <Option key={hour} value={hour} size={InputSizes.xs}>
              {hourText}
            </Option>
          );
        })}
      </Select>
    );
  }

  renderMinute(type) {
    const { ranges } = this.props;
    const dateSelected =
      type === "startMinute" ? ranges[0].startDate : ranges[0].endDate;
    const isDisabled =
      (type === "startMinute" && !ranges[0].startDate) ||
      (type === "endMinute" && !ranges[0].endDate);
    const minuteFormatted = this.getTimeFromDate("minute", dateSelected);

    return (
      <Select
        className={styles.hourSelect}
        name={type}
        value={minuteFormatted}
        disabled={isDisabled}
        onChange={(value) => this.onChangeTime(type, value)}
        size={InputSizes.xs}
        menuClassName={styles.hourAndMinuteSelectMenu}
      >
        {new Array(60).fill(null).map((_, minute) => {
          const minuteText = minute < 10 ? `0${minute}` : `${minute}`;

          return (
            <Option key={minute} value={minute} size={InputSizes.xs}>
              {minuteText}
            </Option>
          );
        })}
      </Select>
    );
  }

  onChangeTime(type, time) {
    const { ranges, onSetTime } = this.props;

    if (type === "startHour") {
      onSetTime(setHours(ranges[0].startDate, time), "startTime");
    } else if (type === "endHour") {
      onSetTime(setHours(ranges[0].endDate, time), "endTime");
    } else if (type === "startMinute") {
      onSetTime(setMinutes(ranges[0].startDate, time), "startTime");
    } else if (type === "endMinute") {
      onSetTime(setMinutes(ranges[0].endDate, time), "endTime");
    }
  }

  handleResetDate = () => {
    this.setState({ isReset: true });
    this.props.onReset();
  };

  handleConfirm = () => {
    this.setState({ isReset: false });
    this.props.onConfirm();
  };

  renderConfirmDate() {
    const {
      hasTime,
      dateDisplayFormat,
      date,
      ranges,
      months,
      onResetFocusRange,
      onCancel,
      onConfirm,
      rangeSelected,
    } = this.props;
    const formatPattern = hasTime ? dateDisplayFormat : "dd/MM/yyyy";
    const isRangeNotNull =
      ranges.length > 0 &&
      (isValid(ranges[0].startDate) || isValid(ranges[0].endDate));
    const isRangeValid =
      (ranges.length > 0 &&
        isValid(ranges[0].startDate) &&
        isValid(ranges[0].endDate)) ||
      isValid(date);

    let timeFormatted = "";
    if (isRangeNotNull) {
      const startTimeFormatted = this.formatDateDisplay(
        ranges[0].startDate,
        "",
        formatPattern
      );
      const endTimeFormatted = this.formatDateDisplay(
        ranges[0].endDate,
        "",
        formatPattern
      );
      timeFormatted = isRangeNotNull
        ? `${startTimeFormatted as string} - ${endTimeFormatted as string}`
        : "";
    }

    const handleCancel = () => {
      if (onResetFocusRange) {
        onResetFocusRange();
      }
      onCancel();
    };

    const showResetButton =
      (!!rangeSelected &&
        isValid(rangeSelected.startDate) &&
        isValid(rangeSelected.endDate)) ||
      isValid(date);

    return (
      <Grid container spacing={8} direction="column">
        <Grid
          item
          container
          justifyContent="space-between"
          className={cx(styles.confirmDate, {
            [styles.hasOneMonth]: months === 1,
          })}
        >
          <div>
            {showResetButton && (
              <Button
                className={styles.btnReset}
                icon={RotateCcw}
                size={ButtonSizes.sm}
                variant={ButtonVariants.secondary}
                onClick={this.handleResetDate}
              />
            )}

            {months > 1 && (
              <span className={styles.dateRangeResult}>{timeFormatted}</span>
            )}
          </div>
          <div>
            <Button
              variant={ButtonVariants.secondary}
              size={ButtonSizes.sm}
              className={styles.btnConfirm}
              onClick={handleCancel}
            >
              Thoát
            </Button>
            <Button
              variant={ButtonVariants.primary}
              size={ButtonSizes.sm}
              className={styles.btnConfirm}
              disabled={!isRangeValid && !this.state.isReset}
              onClick={onConfirm}
            >
              Áp dụng
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {
      onPreviewChange,
      direction,
      disabledDates,
      rangeColors,
      color,
      months,
    } = this.props;
    const { focusedDate } = this.state;
    const isVertical = direction === "vertical";
    const navigatorRenderer =
      this.props.navigatorRenderer || this.renderMonthAndYear;

    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color,
    }));

    const _focusedDate = isValid(focusedDate)
      ? focusedDate
      : subMonths(new Date(), 1);

    return (
      <div
        className={cx(styles.calendarWrapper, this.props.className)}
        onMouseUp={() => this.setState({ drag: { status: false, range: {} } })}
        onMouseLeave={() => {
          this.setState({ drag: { status: false, range: {} } });
        }}
      >
        <Grid container direction="column" spacing={4}>
          <Grid item>
            {navigatorRenderer(focusedDate, this.changeShownDate, this.props)}
          </Grid>

          <Grid
            item
            className={cx(
              styles.months,
              isVertical ? styles.monthsVertical : styles.monthsHorizontal
            )}
          >
            {new Array(months).fill(null).map((_, i) => {
              const monthStep = addMonths(_focusedDate, i);
              return (
                <Month
                  {...this.props}
                  onPreviewChange={
                    this.props.onPreviewChange || this.updatePreview
                  }
                  preview={this.props.preview || this.state.preview}
                  ranges={ranges}
                  key={i}
                  drag={this.state.drag}
                  dateOptions={this.dateOptions}
                  disabledDates={disabledDates}
                  month={monthStep}
                  onDragSelectionStart={this.onDragSelectionStart}
                  onDragSelectionEnd={this.onDragSelectionEnd}
                  onDragSelectionMove={this.onDragSelectionMove}
                  onMouseLeave={() => onPreviewChange?.()}
                  styles={styles}
                  showWeekDays={!isVertical || i === 0}
                  showMonthName={months > 1}
                />
              );
            })}
          </Grid>

          {this.props.hasTime && (
            <Grid item className={styles.timeDisplay}>
              <div className={styles.timeItem}>
                {this.renderHour("startHour")}
                <span className={styles.timeSeparate}>:</span>
                {this.renderMinute("startMinute")}
              </div>
              <ArrowRight
                // @ts-ignore
                className={styles.arrowSeparateTime}
              />
              <div className={styles.timeItem}>
                {this.renderHour("endHour")}
                <span className={styles.timeSeparate}>:</span>
                {this.renderMinute("endMinute")}
              </div>
            </Grid>
          )}

          <Grid item />
          <Grid item>{this.renderConfirmDate()}</Grid>
        </Grid>
      </div>
    );
  }
}

export default Calendar;
