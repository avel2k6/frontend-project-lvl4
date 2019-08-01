import React from 'react';
import Alert from './Alert';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ModalNewChannel from './ModalNewChannel';
import ModalRenamedChannel from './ModalRenamedChannel';
import ModalDeletedChannel from './ModalDeletedChannel';

const App = () => (
  <div className="fixed-top w-100 h-100 bg-white">
    <div className="col-4 bg-info text-light p-3 h-100 d-inline-block align-top">
      <Channels />
    </div>
    <div className="col-8 bg-white h-100 d-inline-block align-top">
      <div className="w-100 h-100">
        <div className="w-100 h-100">
          <Messages />
        </div>
        <div className="row w-100 p-2 position-absolute b-0">
          <MessageForm />
        </div>
      </div>
    </div>
    <ModalNewChannel />
    <ModalRenamedChannel />
    <ModalDeletedChannel />
    <Alert />
  </div>
);

export default App;
