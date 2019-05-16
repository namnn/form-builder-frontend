import * as React from 'react';
import * as styles from '../../../style.css';
import { IFormFieldProps } from 'app/models';

export class Checkbox extends React.Component<IFormFieldProps> {
  constructor(props: IFormFieldProps, context?: any) {
    super(props, context);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value.toString() === 'on';
    this.props.onValueChanged(this.props.field, nextValue);
  }

  render() {
    return (
      <div className={styles.row}>
        <label className={styles.column50}>{this.props.field.label}</label>
        <input
          className={styles.column50}
          type='checkbox'
          placeholder={this.props.field.placeholder}
          checked={this.props.field.value}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
