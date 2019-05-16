import { IForm, IFormField } from "app/models";

export interface RootState {
  formBuilder: RootState.FormBuilderState;
  formList: RootState.FormListState;
  fieldList: RootState.FieldListState;
  submissionList: RootState.SubmissionListState;
  router?: any;
}

export namespace RootState {
  export interface FormBuilderState {
    previewId: string;
    previewName: string;
  }
  export type FormListState = IForm[];
  export type FieldListState = IFormField[];
  export type SubmissionListState = {[key: string]: any}[];
}
