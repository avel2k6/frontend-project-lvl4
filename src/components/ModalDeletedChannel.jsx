import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({ uiDeletedChannel, deletedChannelId }) => ({
  uiDeletedChannel,
  deletedChannelId,
});

@connect(mapStateToProps)
class ModalDeletedChannel extends React.Component {
  handleToggleModalDeleteChannel = () => {
    const { toggleModalDeleteChannel } = this.props;
    toggleModalDeleteChannel();
  };

  handleDeleteChannel = async () => {
    const {
      deletedChannelId, deleteChannel,
    } = this.props;
    await deleteChannel({ id: deletedChannelId });
  };

  render() {
    const { uiDeletedChannel } = this.props;
    return (
      <Modal show={uiDeletedChannel.modalWindow} onHide={this.handleToggleModalDeleteChannel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete this channel?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleToggleModalDeleteChannel}>
              Close
          </Button>
          <Button variant="danger" onClick={this.handleDeleteChannel}>
              Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalDeletedChannel;
