import React from 'react';

export default class Channels extends React.Component{
  render() {
    const { channelsList } = this.props;
    console.log(channelsList);
    return(
      <div className="col col-lg-2">
      <div className="w-100">
        <h2>Список</h2>
      </div>
        <ul>
          {channelsList.map(
            channel => <li>{channel.name}</li>
          )}
        </ul>
      </div>
    );
  }
}
