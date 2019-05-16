import * as React from 'react';
import { IFormField } from 'app/models';
import { FieldSchema } from "app/components/field-schema";

export namespace FieldSchemaList {
  export interface Props {
    fields: IFormField[];
    onFieldChanged: (field: IFormField) => void;
    onFieldDeleted: (field: IFormField) => void;
  }
}

export class FieldSchemaList extends React.Component<FieldSchemaList.Props> {
  handleSchemaChanged(field: IFormField): void {
    this.props.onFieldChanged(field);
  }

  handleSchemaDeleted(field: IFormField): void {
    this.props.onFieldDeleted(field);
  }

  render() {
    const { fields } = this.props;

    return (
      <section className='form-group'>
        <ul className='table-bordered'>
          {fields.map((field: IFormField) => {
            return <div>
              <FieldSchema key={field.id} field={field} onSchemaChanged={this.handleSchemaChanged.bind(this)}/>
            </div>;
          })}
        </ul>
      </section>
    );
  }
}
