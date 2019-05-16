/** Data Models **/
export enum FieldType {
  Textbox = 'textbox',
  Dropdown = 'dropdown',
  Checkbox = 'checkbox',
  Textarea = 'textarea',
  File = 'file'
}

export interface IFieldOption {
  label: string;
  value: any;
}

export interface IFormField {
  id: string;
  type: FieldType;
  label: string;
  value: any;
  placeholder?: string;
  options?: IFieldOption[];
}

export interface IForm {
  id: string;
  name: string;
  fields: IFormField[];
}
/** End - Data Models **/

/** Ui Models **/
export interface IFormFieldProps {
  field: IFormField;
  onValueChanged: (field: IFormField, value: any) => void;
}

export interface IFormSummaryProps {
  form: IForm;
  selected: boolean;
  onFormSelected: (form: IForm) => void;
  onFormDeleted: (form: IForm) => void;
}

export interface IFieldSchemaProps {
  field: IFormField;
  onSchemaChanged: (field: IFormField) => void;
}
/** End - Ui Models **/
