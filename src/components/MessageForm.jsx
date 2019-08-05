import React from 'react';
// import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import UsernameContext from '../context/UsernameContext';

const mapStateToProps = (state) => {
  const props = {
    message: state.message,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps)
class MessageForm extends React.Component {
  static contextType = UsernameContext;

  handleAddMessage = userName => async ({ message }) => {
    const {
      addMessage, currentChannelId, reset,
    } = this.props;

    await addMessage({
      text: message,
      channelId: currentChannelId,
      user: userName,
    });
    reset();
  };

  render() {
    const {
      handleSubmit, submitting, pristine,
    } = this.props;
    const userName = this.context;

    return (
      <div className="w-100">
        <form className="form-inline" onSubmit={handleSubmit(this.handleAddMessage(userName))}>
          <div className="overflow-hidden rounded border w-100 shadow-sm">
            <Field name="message" className="form-control border-0 w-75" required disabled={submitting} component="input" type="text" />
            <input type="submit" disabled={pristine || submitting} className="btn btn-info rounded-0 w-25" value="Add" />
          </div>
        </form>
      </div>
    );
  }
}

export default MessageForm;
