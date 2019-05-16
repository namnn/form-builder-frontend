import * as React from 'react';
import { IFormField } from 'app/models';
import { FieldList } from 'app/components';
import { FormBuilderAction } from 'app/actions';
import * as styles from '../../style.css';
import { FieldSchemaList } from "app/components/field-schema-list";

export namespace FormDetails {
  export interface Props {
    id: string;
    name: string;
    fields: IFormField[];
    actions: FormBuilderAction;
  }
}

export class FormDetails extends React.Component<FormDetails.Props> {
  handleAddField(): void {
    this.props.actions.addFormField();
  }

  handleFieldChanged(field: IFormField): void {
    this.props.actions.editFormField(field);
  }

  handleFieldDeleted(field: IFormField): void {
    this.props.actions.deleteFormField(field.id);
  }

  handleFormNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.actions.updateFormDetails({ id: this.props.id, name: event.target.value });
  }

  handleSaveSchema() {
    const { id, name, fields } = this.props;
    this.props.actions.saveFormSchema({ id, name, fields });
  }

  handleSubmit() {
    this.props.actions.submitFormData(this.props.fields);
  }

  render() {
    const { name, fields } = this.props;
    return (
      <section className={styles.row}>
        <div className={styles.column50}>
          <input value={name} onChange={this.handleFormNameChanged.bind(this)}/>
          <br/>
          <button onClick={this.handleAddField.bind(this)}>Add</button>
          <FieldSchemaList
            fields={fields}
            onFieldChanged={this.handleFieldChanged.bind(this)}
            onFieldDeleted={this.handleFieldDeleted.bind(this)}/>
          <button onClick={this.handleSaveSchema.bind(this)}>Save Form</button>
        </div>
        <div className={styles.column50}>
          <FieldList
            fields={fields}
            onFieldChanged={this.handleFieldChanged.bind(this)}/>
          {fields.length > 0 ? <button onClick={this.handleSubmit.bind(this)}>Submit</button> : <div></div>}
        </div>
      </section>
    );
  }
}
