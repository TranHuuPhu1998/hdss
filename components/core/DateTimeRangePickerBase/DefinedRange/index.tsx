import cx from 'classnames';
import React, { Component } from 'react';
import { defaultInputRanges, defaultStaticRanges } from '../defaultRanges';

import styles from './styles.module.scss';

class DefinedRanges extends Component<any, any> {
  static defaultProps = {
    inputRanges: defaultInputRanges,
    staticRanges: defaultStaticRanges,
    ranges: [],
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    focusedRange: [0, 0],
  };

  constructor(props) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleRangeChange(range): void {
    const { onChange, ranges, focusedRange } = this.props;
    const selectedRange = ranges[focusedRange[0]];
    if (!onChange || !selectedRange) return;
    onChange({
      [selectedRange.key || `range${(focusedRange[0] as number) + 1}`]: {
        ...selectedRange,
        ...range,
      },
    });
  }

  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex((range) => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return { selectedRange, focusedRangeIndex };
  }

  render() {
    const {
      onPreviewChange,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className,
      minDate,
      maxDate,
    } = this.props;

    return (
      <div className={cx(styles.definedRangesWrapper, className)}>
        {this.props.headerContent}
        <div className={styles.staticRanges}>
          {this.props.staticRanges.map((staticRange, i) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(
              ranges,
              staticRange
            );
            const isDisabled = staticRange.isDisabled(minDate, maxDate);

            let labelContent;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }

            return (
              <button
                type="button"
                className={cx(styles.staticRange, {
                  [styles.staticRangeSelected]: Boolean(selectedRange),
                })}
                style={{
                  color: selectedRange
                    ? selectedRange.color || rangeColors[focusedRangeIndex]
                    : null,
                }}
                disabled={isDisabled}
                key={i}
                onClick={() =>
                  this.handleRangeChange(staticRange.range(this.props))
                }
                onFocus={() => onPreviewChange?.(staticRange.range(this.props))}
                onMouseOver={() =>
                  onPreviewChange?.(staticRange.range(this.props))
                }
                onMouseLeave={() => {
                  if (typeof this.props.onPreviewChange === 'function') {
                    this.props.onPreviewChange();
                  }
                }}
              >
                <span tabIndex={-1} className={styles.staticRangeLabel}>
                  {labelContent}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.inputRanges}>
          {this.props.inputRanges.map((rangeOption, i) => {
            const isDisabled = rangeOption.isDisabled(minDate, maxDate);

            return (
              <div className={styles.inputRange} key={i}>
                <input
                  className={styles.inputRangeInput}
                  onFocus={() =>
                    this.setState({ focusedInput: i, rangeOffset: 0 })
                  }
                  onBlur={() => this.setState({ rangeOffset: 0 })}
                  placeholder={'-'}
                  onChange={(e) => {
                    let value = parseInt(e.target.value, 10);
                    value = isNaN(value)
                      ? null
                      : Math.max(Math.min(99999, value), 0);

                    this.handleRangeChange(
                      rangeOption.range(value, this.props)
                    );
                  }}
                  min={0}
                  max={99999}
                  value={
                    rangeOption.getCurrentValue
                      ? rangeOption.getCurrentValue(
                          ranges[this.props.focusedRange[0]] || {}
                        )
                      : ''
                  }
                  disabled={isDisabled}
                />
                <span className={styles.inputRangeLabel}>
                  {rangeOption.label}
                </span>
              </div>
            );
          })}
        </div>
        {this.props.footerContent}
      </div>
    );
  }
}

export default DefinedRanges;
