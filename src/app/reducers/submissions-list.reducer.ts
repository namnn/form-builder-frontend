import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { FormBuilderActions } from 'app/actions';

const initialState: RootState.SubmissionListState = [];

export const submissionListReducer = handleActions<RootState.SubmissionListState, any>(
  {
    [FormBuilderActions.Type.INIT_SUBMISSIONS]: (state, action) => {
      return action.payload;
    },
    [FormBuilderActions.Type.CLEAR_ALL]: () => {
      return initialState;
    }
  },
  initialState
);
