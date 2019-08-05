import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, uiNewChannel }) => ({
  currentChannelId,
  uiNewChannel,
});

@reduxForm({ form: 'newChannel' })
@connect(mapStateToProps)
class ModalNewChannel extends React.Component {
  handleToggleModalNewChannel = () => {
    const { toggleModalNewChannel } = this.props;
    toggleModalNewChannel();
  };

  handleAddChannel = async ({ channelName }) => {
    const {
      addChannel, reset,
    } = this.props;

    await addChannel(channelName);
    reset();
  };

  render() {
    const { uiNewChannel, submitting, handleSubmit } = this.props;
    return (
      <Modal show={uiNewChannel.modalWindow} onHide={this.handleToggleModalNewChannel}>
        <Form onSubmit={handleSubmit(this.handleAddChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>New channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are going to add new channel</p>
            <Field name="channelName" className="w-100" required disabled={submitting} component="input" type="text" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggleModalNewChannel}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Add new channel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default ModalNewChannel;
