import * as React from 'react';
import { FieldType, IFormField } from 'app/models';
import { Dropdown, Textbox } from 'app/components/fields';
import { Checkbox } from "app/components";

export namespace FieldList {
  export interface Props {
    fields: IFormField[];
    onFieldChanged: (field: IFormField) => void;
  }
  export interface State {
    fields: IFormField[];
  }
}

export class FieldList extends React.Component<FieldList.Props, FieldList.State> {
  constructor(props: FieldList.Props, context?: any) {
    super(props, context);
    this.state = {
      fields: props.fields
    };
  }

  shouldComponentUpdate(props: FieldList.Props, state: FieldList.State): boolean {
    return props.fields !== state.fields
  }

  handleFieldValueChanged(field: IFormField, nextValue: any): void {
    this.props.onFieldChanged({ ...field, value: nextValue });
  }

  render() {
    const { fields } = this.props;
    const textboxCtor = (field: IFormField) => {
      return <Textbox
        key={field.id}
        field={field}
        onValueChanged={this.handleFieldValueChanged.bind(this)}
      />;
    };
    const dropdownCtor = (field: IFormField) => {
      return <Dropdown
        key={field.id}
        field={field}
        onValueChanged={this.handleFieldValueChanged.bind(this)}
      />;
    };
    const checkboxCtor = (field: IFormField) => {
      return <Checkbox
        key={field.id}
        field={field}
        onValueChanged={this.handleFieldValueChanged.bind(this)}
      />;
    };

    return (
      <section className='form-group'>
        <ul className='table-bordered'>
          {fields.map((field: IFormField) => {
            switch (field.type) {
              case FieldType.Dropdown:
                return dropdownCtor(field);
              case FieldType.Checkbox:
                return checkboxCtor(field);
              case FieldType.Textbox:
              default:
                return textboxCtor(field);
            }
          })}
        </ul>
      </section>
    );
  }
}
