import axios from 'axios';
import { retry } from '@lifeomic/attempt'; // https://github.com/lifeomic/attempt
import { createAction } from 'redux-actions';
import qs from 'qs';
/* eslint-disable import/no-extraneous-dependencies */
import io from 'socket.io-client';
/* eslint-enable */
import { animateScroll } from 'react-scroll';
import routes from '../routes';


export const initChat = createAction('INIT_CHAT');
export const changeCurrentChannel = createAction('CHANGE_CURRENT_CHANNEL');

export const toggleModalNewChannel = createAction('TOGGLE_MODAL_NEW_CHANNEL');
export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const toggleModalRenameChannel = createAction('TOGGLE_MODAL_RENAME_CHANNEL');
export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const toggleModalDeleteChannel = createAction('TOGGLE_MODAL_DELETE_CHANNEL');
export const deletehannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

const retryOptions = {
  delay: 2000,
  maxAttempts: 3,
  initialDelay: 0,
  minDelay: 0,
  maxDelay: 0,
  factor: 0,
  timeout: 0,
  jitter: false,
  handleError: null,
  handleTimeout: null,
  beforeAttempt: null,
  calculateDelay: null,
};

export const deleteChannel = ({ id }) => async (dispatch) => {
  const url = routes.channelPath(id);
  dispatch(renameChannelRequest());
  try {
    const axiosOptions = {
      method: 'DELETE',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: { id },
      url,
    };
    await retry(() => axios(axiosOptions), retryOptions);
    dispatch(deleteChannelSuccess());
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const listenDeleteChannel = dispatch => io().on('removeChannel', ({ data }) => {
  dispatch(deleteChannelSuccess(data));
});

export const renameChannel = ({ name, id }) => async (dispatch) => {
  const url = routes.channelPath(id);
  dispatch(renameChannelRequest());
  const preparedData = qs.stringify({ data: { attributes: { name } } });
  try {
    const axiosOptions = {
      method: 'PATCH',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: preparedData,
      params: { id },
      url,
    };
    const response = await retry(() => axios(axiosOptions), retryOptions);
    const { data } = response;
    dispatch(renameChannelSuccess(data));
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};

export const listenRenameChannel = dispatch => io().on('renameChannel', ({ data: { attributes } }) => {
  dispatch(renameChannelSuccess(attributes));
});

export const addChannel = channelName => async (dispatch) => {
  const url = routes.channelsPath();
  dispatch(addChannelRequest());
  const preparedData = qs.stringify({ data: { attributes: { name: channelName } } });
  try {
    const axiosOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: preparedData,
      url,
    };
    const response = await retry(() => axios(axiosOptions), retryOptions);
    const { data: { data } } = response;
    dispatch(addChannelSuccess(data));
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const listenNewChannel = dispatch => io().on('newChannel', ({ data }) => {
  dispatch(addChannelSuccess(data));
});

export const addMessage = message => async (dispatch) => {
  const { channel } = message;
  const url = routes.channelMessagesPath(channel);
  dispatch(addMessageRequest());
  const preparedData = qs.stringify({ data: { attributes: { ...message } } });
  try {
    const axiosOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: preparedData,
      params: { channelId: channel },
      url,
    };
    const response = await retry(() => axios(axiosOptions), retryOptions);
    const { data: { data: { attributes } } } = response;
    dispatch(addMessageSuccess(attributes));
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export const listenNewMessage = dispatch => io().on('newMessage', ({ data: { attributes } }) => {
  dispatch(addMessageSuccess(attributes));
  const channelId = `channel-${attributes.channel}`;
  animateScroll.scrollToBottom({
    containerId: channelId,
  });
});
