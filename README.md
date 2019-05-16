```
+) Technical cover:
    * Template inspired by react-redux-typescript-boilerplate 1.0.1
    * Typescript + ReactJs + Redux + Axios
    * Models:
        IForm {
            id: string;
            name: string;
            fields: IFormField[];
        };
        IFormField {
            id: string;
            type: FieldType; // 'textbox', 'checkbox', 'dropdown'
            label: string;
            value: any;
            placeholder?: string;
            options?: IFieldOption[]; // for dropdown only
        }
    * Store: {
        formBuilder: { previewId, previewName },
        fieldList: IFormField[], // currently being previewed
        formList: IForm[],
        submissionList: { [key: string]: any }[]
    }

+) Feature cover:
    * Form list:
        - List all form schemas from the database.
        - Delete an existing form schema.
        - View form schema
    * Form details:
        - Editable form name.
        - Ability to add basic form field info (label & type). // Support 'textbox' and 'checkbox' atm
        - Save (and close) form details back to server.
        - Live preview of form fields as label and type are changed.
    * Form submission
    * Subimission list (presented in <pre> json format)
    
+) Known issues:
    * Upon submitting form data, only checkbox component gets reset
    * No ability to delete submission or form field
    * No support for dropdown, textarea, file
    
+) Improvements:
    * Current behaviour: Upon saving form or submission, some actions are followed up to re-get data from server.
    * Desired behaviour: Implement message bus (pubnub or socket) to auto fetch data whenever there is update.
```