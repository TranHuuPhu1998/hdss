import React, { Component } from 'react';

import cx from '../../../../utils/classnames';
import DateRange from '../DateRange';
import DefinedRange from '../DefinedRange';
import { findNextRangeIndex } from '../utils';
import styles from './styles.module.scss';

class DateRangePicker extends Component<any, any> {
  dateRange;

  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
  }

  resetFocusRange = () => {
    this.setState({ focusedRange: [0, 0] });
  };

  handleChangeRangeFocus = (focusedRange) => {
    this.setState({ focusedRange });
  };

  render() {
    const { focusedRange } = this.state;
    return (
      <div className={cx(styles.dateRangePickerWrapper, this.props.className)}>
        {this.props.showStaticRange && (
          <DefinedRange
            focusedRange={focusedRange}
            onPreviewChange={(value) => this.dateRange.updatePreview(value)}
            {...this.props}
            range={this.props.ranges[focusedRange[0]]}
            className={undefined}
          />
        )}
        <DateRange
          onRangeFocusChange={this.handleChangeRangeFocus}
          focusedRange={focusedRange}
          onResetFocusRange={this.resetFocusRange}
          {...this.props}
          ref={(t) => (this.dateRange = t)}
          className={undefined}
        />
      </div>
    );
  }
}

export default DateRangePicker;
