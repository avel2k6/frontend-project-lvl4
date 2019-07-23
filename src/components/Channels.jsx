import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { byId, allIds } = state.channels;
  return {
    channels: allIds.map(id => byId[id]),
  };
};

@connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <>
        <div className="w-100">
          <h2>Список</h2>
        </div>
        <ul>
          {channels.map(
            channel => <li key={channel.id}>{channel.name}</li>,
          )}
        </ul>

      </>
    );
  }
}

export default Channels;
