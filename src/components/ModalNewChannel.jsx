import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentChannelId, uiNewChannel } = state;
  return {
    currentChannelId,
    uiNewChannel,
  };
};

const actionCreators = {
  toggleModalNewChannel: actions.toggleModalNewChannel,
  addChannel: actions.addChannel,
};

@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps, actionCreators)
class ModalNewChannel extends React.Component {
  handleToggleModalNewChannel = () => {
    const { toggleModalNewChannel } = this.props;
    toggleModalNewChannel();
  };

  handleAddChannel = ({ channelName }) => {
    const { addChannel, reset } = this.props;
    addChannel(channelName);
    reset();
  };

  render() {
    const { uiNewChannel, submitting, handleSubmit } = this.props;
    return (
      <Modal show={uiNewChannel.modalWindow} onHide={this.handleToggleModalNewChannel}>
        <Form onSubmit={handleSubmit(this.handleAddChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Woohoo</p>
            <Field name="channelName" required disabled={submitting} component="input" type="text" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggleModalNewChannel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalNewChannel;
