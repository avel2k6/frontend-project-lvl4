import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { byId, allIds } = state.messages;
  return {
    messages: allIds.map(id => byId[id]),
  };
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <>
        <div className="w-100">
          <h2>Чат</h2>
        </div>
        <div className="w-100">
          {
            messages.map(mes => (
              <div key={mes.id}>
                {mes.user}
                :
                {' '}
                {mes.text}
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

export default Messages;
