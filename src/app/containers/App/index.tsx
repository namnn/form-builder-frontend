import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { FormBuilderAction, FormBuilderActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import * as styles from '../../style.css';
import { FormDetails, FormSummary } from 'app/components';
import { IForm } from "app/models";

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    formBuilder: RootState.FormBuilderState;
    formList: RootState.FormListState;
    fieldList: RootState.FieldListState;
    submissionList: RootState.SubmissionListState;
    actions: FormBuilderAction;
  }
}

@connect(
  (state: RootState): Pick<App.Props, 'formBuilder' | 'formList' | 'fieldList' | 'submissionList'> => {
    return {
      formBuilder: state.formBuilder,
      formList: state.formList,
      fieldList: state.fieldList,
      submissionList: state.submissionList
    };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(FormBuilderActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
    props.actions.getFormSchemas();
    props.actions.getFormSubmissions();
  }

  handleAddForm(): void {
    this.props.actions.addForm();
  }

  handleFormSelected(form: IForm): void {
    this.props.actions.previewForm(form);
  }

  handleFormDeleted(form: IForm): void {
    this.props.actions.deleteFormSchema(form);
  }

  render() {
    const { actions, formBuilder, formList, fieldList, submissionList } = this.props;
    const { previewName, previewId } = formBuilder;

    return (
      <div className={styles.row}>
        <div className={styles.column30}>
          <button onClick={this.handleAddForm.bind(this)}>Add Form</button>
          {formList.map((form: IForm) => {
            return <FormSummary
              key={form.id}
              form={form}
              selected={form.id === previewId}
              onFormSelected={this.handleFormSelected.bind(this)}
              onFormDeleted={this.handleFormDeleted.bind(this)}/>;
          })}

          <h3>Submissions</h3>
          {submissionList.map((submission: any, index: number) => <pre key={index}>{JSON.stringify(submission)}</pre>)}
        </div>
        <div className={styles.column70}>
          {!!previewId
            ? <FormDetails id={previewId} fields={fieldList} name={previewName} actions={actions}/>
            : <div></div>
          }
        </div>
      </div>
    );
  }
}
