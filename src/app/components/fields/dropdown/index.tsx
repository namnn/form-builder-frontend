import * as React from 'react';
import * as styles from '../../../style.css';
import { IFieldOption, IFormFieldProps } from 'app/models';

export interface DropdownState {
  value: string;
}

export class Dropdown extends React.Component<IFormFieldProps, DropdownState> {
  constructor(props: IFormFieldProps, context?: any) {
    super(props, context);
    this.state = {
      value: props.field.value
    };
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ value: event.target.value });
    this.props.onValueChanged(this.props.field, event.target.value);
  }

  render() {
    const options = this.props.field ? this.props.field.options || [] : [];
    const optionElementCtor = (opt: IFieldOption) => {
      return <option key={opt.value} value={opt.value} label={opt.label}></option>;
    };

    return (
      <div className={styles.row}>
        <label className={styles.column50}>{this.props.field.label}</label>
        <select
          className={styles.column50}
          placeholder={this.props.field.placeholder}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
          {options.map(optionElementCtor)}
        </select>
      </div>
    );
  }
}
