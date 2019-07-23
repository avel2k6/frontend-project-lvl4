import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const App = () => (
  <div className="row">
    <div className="col col-3">
      <Channels />
    </div>
    <div className="col col-9">
      <Messages />
      <MessageForm />
    </div>
  </div>
);

export default App;
