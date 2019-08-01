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
export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const updateMessagesRequest = createAction('MESSAGES_UPDATE_REQUEST');
export const updateMessagesSuccess = createAction('MESSAGES_UPDATE_SUCCESS');
export const updateMessagesFailure = createAction('MESSAGES_UPDATE_FAILURE');

export const addWarning = createAction('ADD_WARNING');
export const appIsOffline = createAction('IS_OFFLINE');

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
  dispatch(deleteChannelRequest());
  return axios.delete(url, { params: { id } });
};

export const renameChannel = ({ name, id }) => async (dispatch) => {
  const url = routes.channelPath(id);
  dispatch(renameChannelRequest());
  const preparedData = qs.stringify({ data: { attributes: { name } } });
  return axios.patch(url, preparedData, { params: { id } });
};

export const addChannel = channelName => async (dispatch) => {
  const url = routes.channelsPath();
  dispatch(addChannelRequest());
  const preparedData = qs.stringify({ data: { attributes: { name: channelName } } });
  return axios.post(url, preparedData);
};

export const addMessage = message => async (dispatch) => {
  const { channelId } = message;
  const url = routes.channelMessagesPath(channelId);
  dispatch(addMessageRequest());
  const preparedData = qs.stringify({ data: { attributes: { ...message } } });
  return axios.post(url, preparedData, { params: { channelId } });
};

export const updateMessages = ({ channelId }) => async (dispatch) => {
  const url = routes.channelMessagesPath(channelId);
  dispatch(updateMessagesRequest());
  try {
    const response = await retry(() => axios.get(url), retryOptions);
    const { data } = response;
    dispatch(updateMessagesSuccess(data));
  } catch (e) {
    dispatch(updateMessagesFailure());
    dispatch(addWarning(e));
  }
};

export const initListeners = (dispatch) => {
  io()
    .on('removeChannel', ({ data }) => {
      dispatch(deleteChannelSuccess(data));
    })
    .on('renameChannel', ({ data: { attributes } }) => {
      dispatch(renameChannelSuccess(attributes));
    })
    .on('newChannel', ({ data }) => {
      dispatch(addChannelSuccess(data));
    })
    .on('newMessage', ({ data: { attributes } }) => {
      dispatch(addMessageSuccess(attributes));
      const channelId = `channel-${attributes.channelId}`;
      animateScroll.scrollToBottom({
        containerId: channelId,
      });
    });
};

export const checkConnect = () => async (dispatch) => {
  const checkInterval = 10000;
  setInterval(() => {
    axios.head('/')
      .catch(
        () => dispatch(appIsOffline()),
      );
  },
  checkInterval);
};
