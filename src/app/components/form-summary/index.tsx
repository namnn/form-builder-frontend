import * as React from 'react';
import * as styles from '../../style.css';
import { IFormSummaryProps } from 'app/models';

export class FormSummary extends React.Component<IFormSummaryProps> {
  constructor(props: IFormSummaryProps, context?: any) {
    super(props, context);
  }

  handleFormSelected() {
    this.props.onFormSelected(this.props.form);
  }

  handleFormDeleted() {
    this.props.onFormDeleted(this.props.form);
  }

  render() {
    const { form, selected } = this.props;
    const nameClassNames = [styles.column50, styles.clickable, selected ? styles.active : ''].filter(cn => cn !== '').join(' ');
    const deleteClassNames = [styles.column50, styles.clickable].join(' ');
    return (
      <div className={styles.row}>
        <span className={nameClassNames} onClick={this.handleFormSelected.bind(this)}>{form.name}</span>
        <span className={deleteClassNames} onClick={this.handleFormDeleted.bind(this)}>Delete</span>
      </div>
    );
  }
}
