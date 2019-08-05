import React from 'react';
import { uniqueId } from 'lodash';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { errors, currentChannelId } = state;
  return {
    errors,
    currentChannelId,
  };
};

@connect(mapStateToProps)
class Alert extends React.Component {
  handleReloadMessages = channelId => () => {
    const { updateMessages } = this.props;
    updateMessages({ channelId });
  };

  render() {
    const { errors: { warning, offline }, currentChannelId } = this.props;
    if (!warning && !offline) {
      return null;
    }

    const messageErrorButton = offline
      ? (
        <div key={uniqueId()}>
          Click to
          <button type="button" className="btn btn-link" onClick={this.handleReloadMessages(currentChannelId)}>update</button>
          messages
        </div>)
      : null;

    const actionErrorDiv = warning
      ? (<div>Try again!</div>)
      : null;

    return (
      <div className="container fixed-top p-1">
        <div className="alert alert-danger shadow-sm" role="alert">
          Network ERROR!
          {messageErrorButton}
          {actionErrorDiv}
        </div>
      </div>
    );
  }
}

export default Alert;
