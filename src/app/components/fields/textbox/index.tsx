import * as React from 'react';
import * as styles from '../../../style.css';
import { IFormFieldProps } from 'app/models';

export interface TextboxState {
  text: string;
}

export class Textbox extends React.Component<IFormFieldProps, TextboxState> {
  constructor(props: IFormFieldProps, context?: any) {
    super(props, context);
    this.state = {
      text: props.field.value
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value });
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim();
    this.props.onValueChanged(this.props.field, text);
  }

  render() {
    return (
      <div className={styles.row}>
        <label className={styles.column50}>{this.props.field.label}</label>
        <input
          className={styles.column50}
          type='text'
          placeholder={this.props.field.placeholder}
          value={this.state.text}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
