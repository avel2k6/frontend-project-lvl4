import React from 'react';
import {
  Row, Col,
} from 'react-bootstrap';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ModalNewChannel from './ModalNewChannel';
import ModalRenamedChannel from './ModalRenamedChannel';
import ModalDeletedChannel from './ModalDeletedChannel';

const App = () => (
  <Row className="shadow bg-white rounded h-75">
    <Col className="col-4 bg-info text-light p-3 rounded-left">
      <Channels />
    </Col>
    <Col className="col-8 bg-white rounded-right">
      <div className="w-100">
        <div className="w-100">
          <Messages />
        </div>
        <Row className="w-100 p-3 stick-to-bottom">
          <MessageForm />
        </Row>
      </div>
    </Col>
    <ModalNewChannel />
    <ModalRenamedChannel />
    <ModalDeletedChannel />
  </Row>
);

export default App;
