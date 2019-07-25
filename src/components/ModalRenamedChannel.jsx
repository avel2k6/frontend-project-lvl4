import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { uiRenamedChannel, renamedChannelId, channels: { byId } } = state;
  const { name } = byId[renamedChannelId] ? byId[renamedChannelId] : { name: '' };
  return {
    uiRenamedChannel,
    renamedChannelId,
    initialValues: { channelName: name },
  };
};

const actionCreators = {
  toggleModalRenameChannel: actions.toggleModalRenameChannel,
  renameChannel: actions.renameChannel,
};

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'renameChannel', enableReinitialize: true })
class ModalRenamedChannel extends React.Component {
  handleToggleModalRenameChannel = () => {
    const { toggleModalRenameChannel } = this.props;
    toggleModalRenameChannel();
  };

  handleRenameChannel = ({ channelName }) => {
    const { renameChannel, renamedChannelId } = this.props;
    renameChannel(
      {
        name: channelName,
        id: renamedChannelId,
      },
    );
  };

  render() {
    const { uiRenamedChannel, submitting, handleSubmit } = this.props;
    return (
      <Modal show={uiRenamedChannel.modalWindow} onHide={this.handleToggleModalRenameChannel}>
        <form onSubmit={handleSubmit(this.handleRenameChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Rename this channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are going to rename channel</p>
            <Field name="channelName" className="w-100" required disabled={submitting} component="input" type="text" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggleModalRenameChannel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default ModalRenamedChannel;
