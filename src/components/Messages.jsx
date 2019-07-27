import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const { currentChannelId } = state;
  return {
    messages: allIds
      .map(id => byId[id])
      .filter(message => message.channelId === currentChannelId),
    currentChannelId,
  };
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages, currentChannelId } = this.props;
    const channelID = `channel-${currentChannelId}`;
    return (
      <>
        <div className="w-100 p-3">
          <div className="chat-window" id={channelID}>
            {
            messages.map(mes => (
              <div key={mes.id}>
                <b>
                  {mes.user}
                </b>
                <br />
                {' '}
                {mes.text}
              </div>
            ))
            }
          </div>
        </div>
      </>
    );
  }
}

export default Messages;
