/* eslint-disable no-fallthrough */
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import startOfDay from 'date-fns/startOfDay';

import React, { Component } from 'react';

import cx from '../../../../utils/classnames';

class DayCell extends Component<any, any> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false,
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.renderSelectionPlaceholders =
      this.renderSelectionPlaceholders.bind(this);
    this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
  }

  handleKeyEvent(event) {
    const { day } = this.props;
    switch (event.keyCode) {
      case 13:
      case 32:
        if (event.type === 'keydown') {
          this.props.onMouseDown(day);
        } else {
          this.props.onMouseUp(day);
        }
        break;
    }
  }

  handleMouseEvent(event) {
    const { day, disabled, onPreviewChange } = this.props;
    const stateChanges: any = {};
    if (disabled) {
      onPreviewChange();
      return;
    }

    switch (event.type) {
      case 'mouseenter':
        this.props.onMouseEnter(day);
        onPreviewChange(day);
        stateChanges.hover = true;
        break;
      case 'blur':
      case 'mouseleave':
        stateChanges.hover = false;
        break;
      case 'mousedown':
        stateChanges.active = true;
        this.props.onMouseDown(day);
        break;
      case 'mouseup':
        event.stopPropagation();
        stateChanges.active = false;
        this.props.onMouseUp(day);
        break;
      case 'focus':
        onPreviewChange(day);
        break;
    }
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
    }
  }

  getClassNames() {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      ihdbankfWeek,
      isStartOfMonth,
      ihdbankfMonth,
      disabled,
      styles,
    } = this.props;

    return cx(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: ihdbankfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: ihdbankfMonth,
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active,
    });
  }

  renderPreviewPlaceholder() {
    const { preview, day, styles, ranges } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
    const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
    const isInRange = isAfter(day, startDate) && isBefore(day, endDate);
    const isStartEdge =
      !isInRange &&
      isSameDay(day, startDate) &&
      ranges.length > 0 &&
      ranges[0].startDate !== null;
    const isEndEdge =
      !isInRange &&
      isSameDay(day, endDate) &&
      ranges.length > 0 &&
      ranges[0].startDate !== null;

    return (
      <span
        className={cx({
          [styles.dayStartPreview]: isStartEdge,
          [styles.dayInPreview]: isInRange,
          [styles.dayEndPreview]: isEndEdge,
        })}
      />
    );
  }

  renderSelectionPlaceholders() {
    const { styles, ranges, day } = this.props;
    if (this.props.displayMode === 'date') {
      const isSelected = isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        <span className={styles.selected} style={{ color: this.props.color }} />
      ) : null;
    }

    const inRanges = ranges.reduce((result, range) => {
      let startDate = range.startDate;
      let endDate = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange = isAfter(day, startDate) && isBefore(day, endDate);
      const isStartEdge = !isInRange && isSameDay(day, startDate);
      const isEndEdge = !isInRange && isSameDay(day, endDate);
      if (isInRange || isStartEdge || isEndEdge) {
        return [
          ...result,
          {
            isStartEdge,
            isEndEdge,
            isInRange,
            ...range,
          },
        ];
      }
      return result;
    }, []);

    return inRanges.map((range, i) => (
      <span
        key={i}
        className={cx({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange,
        })}
        style={{ color: range.color || this.props.color }}
      />
    ));
  }

  render() {
    const { styles } = this.props;
    return (
      <button
        type="button"
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        className={this.getClassNames()}
        {...(this.props.disabled || this.props.isPassive
          ? { tabIndex: -1 }
          : {})}
        style={{ color: this.props.color }}
      >
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <span className={styles.dayNumber}>
          <span>{format(this.props.day, 'dd')}</span>
        </span>
      </button>
    );
  }
}

export default DayCell;
