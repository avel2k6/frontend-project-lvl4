import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import connect from '../connect';

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

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannel', enableReinitialize: true })
class ModalRenamedChannel extends React.Component {
  handleToggleModalRenameChannel = () => {
    const { toggleModalRenameChannel } = this.props;
    toggleModalRenameChannel();
  };

  handleRenameChannel = async ({ channelName }) => {
    const {
      renameChannel, renamedChannelId,
    } = this.props;
    await renameChannel({
      name: channelName,
      id: renamedChannelId,
    });
  };

  render() {
    const {
      uiRenamedChannel, submitting, pristine, handleSubmit, channels: { byId, allIds }, channelName,
    } = this.props;
    const sameNamesCount = allIds
      .reduce((acc, id) => ((byId[id].name === channelName) ? acc + 1 : acc), 0);

    return (
      <Modal show={uiRenamedChannel.modalWindow} onHide={this.handleToggleModalRenameChannel}>
        <form onSubmit={handleSubmit(this.handleRenameChannel)}>
          <Modal.Header closeButton>
            <Modal.Title>Rename this channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are going to rename channel</p>
            <Field name="channelName" className="w-100" required disabled={submitting} component="input" type="text" />
            {sameNamesCount ? <p>Write unique name</p> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggleModalRenameChannel}>Close</Button>
            <Button variant="info" disabled={pristine || sameNamesCount || submitting} type="submit">Save Changes</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default ModalRenamedChannel;
