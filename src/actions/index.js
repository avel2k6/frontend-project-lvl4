import axios from 'axios';
import { retry } from '@lifeomic/attempt'; // https://github.com/lifeomic/attempt
import { createAction } from 'redux-actions';
import qs from 'qs';
/* eslint-disable import/no-extraneous-dependencies */
import io from 'socket.io-client';
/* eslint-enable */
import routes from '../routes';


export const initChat = createAction('INIT_CHAT');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

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
    const response = await retry(() => axios(axiosOptions), retryOptions);
    const { data: { data } } = response;
    dispatch(addMessageSuccess(data));
  } catch (e) {
    dispatch(addMessageFailure());
    throw e;
  }
};

export const listenNewMessage = (dispatch) => {
  io().on('newMessage', (response) => {
    const { data } = response;
    dispatch(addMessageSuccess(data));
  });
};
