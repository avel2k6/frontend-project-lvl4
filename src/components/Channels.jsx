import React from 'react';
import {
  Button, Col, ButtonGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, currentChannelId } = state;
  return {
    channels: allIds.map(id => byId[id]),
    currentChannelId,
  };
};

const actionCreators = {
  changeCurrentChannel: actions.changeCurrentChannel,
  toggleModalNewChannel: actions.toggleModalNewChannel,
  toggleModalRenameChannel: actions.toggleModalRenameChannel,
  toggleModalDeleteChannel: actions.toggleModalDeleteChannel,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleChangeChannel = id => () => {
    const { changeCurrentChannel } = this.props;
    changeCurrentChannel({ id });
  };

  handleToggleModalNewChannel = () => {
    const { toggleModalNewChannel } = this.props;
    toggleModalNewChannel();
  };

  handleToggleModalRenamedChannel = id => () => {
    const { toggleModalRenameChannel } = this.props;
    toggleModalRenameChannel(id);
  }

  handleToggleModalDeleteChannel = id => () => {
    const { toggleModalDeleteChannel } = this.props;
    toggleModalDeleteChannel(id);
  };

  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <>
        <div className="w-100">
          {channels.map(
            channel => (
              <Col
                key={channel.id}
                className={(
                  (channel.id === currentChannelId)
                    ? 'border-3 border-left border-warning pl-3 w-100'
                    : 'border-3 border-left border-info pl-3 w-100 pointer'
                )}
                onClick={this.handleChangeChannel(channel.id)}
              >
                <div>
                  <b>
                    <span>
                      {channel.name }
                    </span>
                  </b>
                </div>
                <ButtonGroup>
                  <Button variant="outline-light" size="sm" onClick={this.handleToggleModalRenamedChannel(channel.id)}>Rename</Button>
                  {
                    channel.removable
                      ? (
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={this.handleToggleModalDeleteChannel(channel.id)}
                        >
Delete
                        </Button>
                      )
                      : null
                  }
                </ButtonGroup>
                <hr />
              </Col>
            ),
          )}
        </div>
        <div className="w-100">
          <Button variant="light" className="w-100" onClick={this.handleToggleModalNewChannel}>
            Add chat
          </Button>
        </div>
      </>
    );
  }
}

export default Channels;
