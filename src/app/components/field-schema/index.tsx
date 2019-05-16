import * as React from 'react';
import * as styles from '../../style.css';
import { FieldType, IFormField, IFieldSchemaProps } from 'app/models';
import { Dropdown, Textbox } from "app/components";

interface IFieldSchemaState {
  showOptions: boolean;
}

export class FieldSchema extends React.Component<IFieldSchemaProps, IFieldSchemaState> {
  constructor(props: IFieldSchemaProps, context?: any) {
    super(props, context);
    this.state = {
      showOptions: props.field.type === FieldType.Dropdown
    }
  }

  handleFieldLabelChanged(field: IFormField, label: string) {
    this.props.onSchemaChanged({ ...this.props.field, label });
  }

  handleFieldTypeChanged(field: IFormField, type: FieldType) {
    this.props.onSchemaChanged({ ...this.props.field, type });
  }

  render() {
    const { field } = this.props;
    const labelSchema = {
      id: 'LABEL',
      label: 'Label',
      type: FieldType.Textbox,
      value: field.label,
      placeholder: 'Enter label'
    };
    const typeSchema = {
      id: 'TYPE',
      label: 'Type',
      type: FieldType.Dropdown,
      value: field.type || FieldType.Textbox,
      options: [
        { label: 'Textbox', value: FieldType.Textbox },
        { label: 'Checkbox', value: FieldType.Checkbox }
      ]
    };

    return (
      <div className={styles.row}>
        <Textbox field={labelSchema} onValueChanged={this.handleFieldLabelChanged.bind(this)}/>
        <Dropdown field={typeSchema} onValueChanged={this.handleFieldTypeChanged.bind(this)}/>
      </div>
    );
  }
}
