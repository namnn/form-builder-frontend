import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { FormBuilderActions } from 'app/actions';
import { IForm } from 'app/models';

const initialState: RootState.FormListState = [];

export const formListReducer = handleActions<RootState.FormListState, any>(
  {
    [FormBuilderActions.Type.INIT_FORMS]: (state, action) => {
      return action.payload;
    },
    [FormBuilderActions.Type.CREATE_FORM]: (state, action) => {
      return [...state, action.payload];
    },
    [FormBuilderActions.Type.UPDATE_FORM]: (state, action) => {
      return state.map((f: IForm) => {
        if ((<IForm>action.payload).id === f.id) {
          f = { ...f, ...action.payload };
        }
        return f;
      })
    },
    [FormBuilderActions.Type.DELETE_FORM]: (state, action) => {
      const toDeleteFormId = <string>action.payload;
      return state.filter((f: IForm) => f.id !== toDeleteFormId);
    },

    [FormBuilderActions.Type.CLEAR_ALL]: () => {
      return initialState;
    }
  },
  initialState
);
