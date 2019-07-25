import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

const selector = formValueSelector('renameChannel');

const mapStateToProps = (state) => {
  const { uiRenamedChannel, renamedChannelId, channels: { byId, allIds } } = state;
  const { name } = byId[renamedChannelId] ? byId[renamedChannelId] : { name: '' };
  const channelName = selector(state, 'channelName');
  return {
    uiRenamedChannel,
    renamedChannelId,
    initialValues: { channelName: name },
    channelName,
    channels: { byId, allIds },
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
    const {
      uiRenamedChannel, submitting, pristine, handleSubmit, channels: { byId, allIds }, channelName,
    } = this.props;
    const sameChannelNamesCount = allIds.reduce(
      (acc, id) => ((byId[id].name === channelName) ? acc + 1 : acc),
      0,
    );
    return (
      <Modal show={uiRenamedChannel.modalWindow} onHide={this.handleToggleModalRenameChannel}>
        <form onSubmit={handleSubmit(this.handleRenameChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Rename this channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are going to rename channel</p>
            <Field name="channelName" className="w-100" required disabled={submitting} component="input" type="text" />
            {sameChannelNamesCount ? <p>Write unique name</p> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggleModalRenameChannel}>
              Close
            </Button>
            <Button variant="info" disabled={pristine || sameChannelNamesCount} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default ModalRenamedChannel;
