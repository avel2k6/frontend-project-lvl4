import React from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import UsernameContext from './UsernameContext';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    message: state.message,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};


@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)
class MessageForm extends React.Component {
  // static contextType = UsernameContext;
  handleAddMessage = userName => ({ message }) => {
    const { addMessage, currentChannelId, reset } = this.props;
    addMessage({
      text: message,
      channel: currentChannelId,
      user: userName,
    });
    reset();
  };

  render() {
    const {
      handleSubmit, submitting, pristine,
    } = this.props;
    return (
      <div className="w-100">
        <UsernameContext.Consumer>
          {
            userName => (
              <form className="form-inline" onSubmit={handleSubmit(this.handleAddMessage(userName))}>
                <div className="overflow-hidden rounded border w-100 shadow-sm">
                  <Field name="message" className="form-control border-0 w-75" required disabled={submitting} component="input" type="text" />
                  <input type="submit" disabled={pristine} className="btn btn-info rounded-0 w-25" value="Add" />
                </div>
              </form>
            )
          }
        </UsernameContext.Consumer>
      </div>
    );
  }
}

export default MessageForm;
