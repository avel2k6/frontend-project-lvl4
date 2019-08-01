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
  handleAddMessage = userName => ({ message }) => {
    const {
      addMessage, currentChannelId, reset, addMessageFailure, addWarning,
    } = this.props;
    return addMessage({
      text: message,
      channelId: currentChannelId,
      user: userName,
    })
      .then(() => {
        reset();
      })
      .catch((e) => {
        addMessageFailure();
        addWarning(e);
      });
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
                  <input type="submit" disabled={pristine || submitting} className="btn btn-info rounded-0 w-25" value="Add" />
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
