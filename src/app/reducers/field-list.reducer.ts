import { handleActions } from 'redux-actions';
import uuid from 'uuid';
import { RootState } from './state';
import { FormBuilderActions } from 'app/actions';
import { FieldType, IFormField } from 'app/models';

const initialState: RootState.FieldListState = [];

export const fieldListReducer = handleActions<RootState.FieldListState, any>(
  {
    [FormBuilderActions.Type.INIT_FORM_FIELDS]: (state, action) => {
      return action.payload;
    },
    [FormBuilderActions.Type.ADD_FORM_FIELD]: (state) => {
      const newFormField: IFormField = {
        id: uuid.v4(),
        label: 'New field',
        type: FieldType.Textbox,
        value: ''
      };
      return [...state, newFormField];
    },
    [FormBuilderActions.Type.DELETE_FORM_FIELD]: (state, action) => {
      return state.filter((f: IFormField) => f.id !== <string>action.payload)
    },
    [FormBuilderActions.Type.EDIT_FORM_FIELD]: (state, action) => {
      return state.map((f: IFormField) => {
        if (!f || !action || !action.payload) {
          return f;
        }
        return f.id === action.payload.id ? { ...f, ...action.payload } : f;
      });
    },
    [FormBuilderActions.Type.EMPTY_FORM_FIELDS]: (state) => {
      const emptyValueFormatter = (type: FieldType) => {
        switch (type) {
          case FieldType.Checkbox:
            return false;
          case FieldType.Textbox:
          default:
            return '';
        }
      };
      return state.map((f: IFormField) => ({ ...f, value: emptyValueFormatter(f.type) }));
    },
    [FormBuilderActions.Type.RESET_FORM_FIELDS]: () => {
      return initialState;
    },
    [FormBuilderActions.Type.CLEAR_ALL]: () => {
      return initialState;
    }
  },
  initialState
);
