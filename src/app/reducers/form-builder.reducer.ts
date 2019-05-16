import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { FormBuilderActions } from 'app/actions';
import { IForm } from "app/models";

const initialState: RootState.FormBuilderState = {
  previewId: <any>null,
  previewName: <any>null,
};

export const formBuilderReducer = handleActions<RootState.FormBuilderState, any>(
  {
    [FormBuilderActions.Type.SELECT_FORM]: (state, action) => {
      const form = <IForm>action.payload;
      return {
        previewId: form.id,
        previewName: form.name
      };
    },
    [FormBuilderActions.Type.DESELECT_FORM]: () => {
      return {
        previewId: <any>null,
        previewName: <any>null
      };
    },
    [FormBuilderActions.Type.UPDATE_FORM_NAME]: (state, action) => {
      return {
        ...state,
        previewName: action.payload
      };
    },
    [FormBuilderActions.Type.CLEAR_ALL]: () => {
      return initialState;
    }
  },
  initialState
);
