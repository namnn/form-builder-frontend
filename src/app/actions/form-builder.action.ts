import { createAction } from 'redux-actions';
import { IFormField } from 'app//models';
import * as apis from "app/apis";
import { IForm } from "app/models";
import uuid from "uuid";

export namespace FormBuilderActions {
  export enum Type {
    SELECT_FORM = 'SELECT_FORM',
    DESELECT_FORM = 'DESELECT_FORM',
    UPDATE_FORM_NAME = 'UPDATE_FORM_NAME',

    INIT_FORMS = 'INIT_FORMS',
    CREATE_FORM = 'CREATE_FORM',
    UPDATE_FORM = 'UPDATE_FORM',
    SAVE_FORM = 'SAVE_FORM',
    DELETE_FORM = 'DELETE_FORM',

    INIT_FORM_FIELDS = 'INIT_FORM_FIELDS',
    ADD_FORM_FIELD = 'ADD_FORM_FIELD',
    EDIT_FORM_FIELD = 'EDIT_FORM_FIELD',
    DELETE_FORM_FIELD = 'DELETE_FORM_FIELD',
    RESET_FORM_FIELDS = 'RESET_FORM_FIELDS',
    EMPTY_FORM_FIELDS = 'EMPTY_FORM_FIELDS',

    // Submissions
    INIT_SUBMISSIONS = 'INIT_SUBMISSIONS',

    CLEAR_ALL = 'CLEAR_ALL'
  }

  // Preview Form Details
  export const selectForm = createAction<IForm>(Type.SELECT_FORM);
  export const deselectForm = createAction(Type.DESELECT_FORM);
  export const updateFormName = createAction<string>(Type.UPDATE_FORM_NAME);

  // General Form Actions
  export const initForms = createAction<IForm[]>(Type.INIT_FORMS);
  export const createForm = createAction<IForm>(Type.CREATE_FORM);
  export const updateForm = createAction<Partial<IForm>>(Type.UPDATE_FORM);
  export const saveForm = createAction<IForm['id']>(Type.SAVE_FORM);
  export const deleteForm = createAction<IForm['id']>(Type.DELETE_FORM);

  // Preview Field List Actions
  export const initFormFields = createAction<IFormField[]>(Type.INIT_FORM_FIELDS);
  export const addFormField = createAction(Type.ADD_FORM_FIELD);
  export const editFormField = createAction<IFormField>(Type.EDIT_FORM_FIELD);
  export const deleteFormField = createAction<IFormField['id']>(Type.DELETE_FORM_FIELD);
  export const resetFormFields = createAction(Type.RESET_FORM_FIELDS);
  export const emptyFormFields = createAction(Type.EMPTY_FORM_FIELDS);

  // Submissions
  export const initSubmissions = createAction<{ [key: string]: any }[]>(Type.INIT_SUBMISSIONS);

  // Cleanup
  export const clearAll = createAction(Type.CLEAR_ALL);

  // Effects
  export const addForm = () => (dispatch: any) => {
    const newForm = {
      id: uuid.v4(),
      name: 'New form',
      fields: []
    };
    dispatch(createForm(newForm));
    dispatch(selectForm(newForm));
    dispatch(initFormFields(newForm.fields));
  };
  export const previewForm = (form: IForm) => (dispatch: any) => {
    dispatch(selectForm(form));
    dispatch(initFormFields(form.fields));
  };
  export const updateFormDetails = (form: Partial<IForm>) => (dispatch: any) => {
    dispatch(updateForm(form));
    dispatch(updateFormName(<string>form.name));
  };
  export const saveFormSchema = (form: IForm) => (dispatch: any) => {
    apis.saveFormSchema(form)
      .then((resp: any) => {
        console.log('Save form schema success', resp);
        dispatch(deselectForm());
        dispatch(resetFormFields());
        dispatch(updateForm(form));
      })
      .catch((error: any) => {
        console.log('Save form schema failure', error);
      });
  };
  export const deleteFormSchema = (form: IForm) => (dispatch: any) => {
    apis.deleteFormSchema(form.id)
      .then((resp: any) => {
        console.log('Delete form schema success', resp);
        dispatch(deleteForm(form.id));
        dispatch(deselectForm());
        dispatch(resetFormFields(form.fields));
      })
      .catch((error: any) => {
        console.log('Delete form schema failure', error);
      });
  };
  export const getFormSchemas = () => (dispatch: any) => {
    apis.getFormSchemas()
      .then((resp: any) => {
        console.log('Get form schemas success', resp);
        dispatch(initForms(resp.data));
      })
      .catch((error: any) => {
        console.log('Get form schemas failure', error);
      });
  };
  export const getFormSubmissions = () => (dispatch: any) => {
    apis.getFormDataSubmissions()
      .then((resp: any) => {
        console.log('Get form submissions success', resp);
        dispatch(initSubmissions(resp.data));
      })
      .catch((error: any) => {
        console.log('Get form submissions failure', error);
      });
  };
  export const submitFormData = (fields: IFormField[]) => (dispatch: any) => {
    const data = fields.reduce((result: any, field: IFormField) => {
      result[field.label] = field.value;
      return result;
    }, {});
    apis.submitFormData({ date: new Date(), data })
      .then((resp: any) => {
        console.log('Submit form data success', resp);
        dispatch(emptyFormFields());
        dispatch(getFormSubmissions());
      })
      .catch((error: any) => {
        console.log('Submit form data failure', error);
      });
  };
}

export type FormBuilderAction = Omit<typeof FormBuilderActions, 'Type'>;
