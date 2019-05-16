import { combineReducers } from 'redux';
import { RootState } from './state';
import { formBuilderReducer } from './form-builder.reducer';
import { fieldListReducer } from './field-list.reducer';
import { formListReducer } from './form-list.reducer';
import { submissionListReducer } from './submissions-list.reducer';

export { RootState };

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  formBuilder: formBuilderReducer as any,
  fieldList: fieldListReducer as any,
  formList: formListReducer as any,
  submissionList: submissionListReducer as any
});
