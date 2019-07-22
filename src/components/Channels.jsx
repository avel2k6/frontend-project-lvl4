import React from 'react';

const Channels = (props) => {
  const { channelsList } = props;
  return (
    <div className="col col-lg-2">
      <div className="w-100">
        <h2>Список</h2>
      </div>
      <ul>
        {channelsList.map(
          channel => <li key={channel.id}>{channel.name}</li>,
        )}
      </ul>
    </div>
  );
};

export default Channels;
