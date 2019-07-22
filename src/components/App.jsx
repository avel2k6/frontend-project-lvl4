import React from 'react';
import Channels from './Channels';

export default class App extends React.Component{
  render() {
    const { gon } = this.props;
    const { channels } = gon;
    console.log(gon);
    return(
      <div className="row">
        <Channels channelsList={channels} />
      </div>
    );
  }
}
