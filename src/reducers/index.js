// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.initChat](state, { payload: gon }) {
    const { messages: initMessages } = gon;
    return {
      byId: initMessages.reduce((acc, mes) => ({ ...acc, [mes.id]: mes }), {}),
      allIds: [...initMessages.map(({ id }) => id)],
    };
  },
  [actions.addMessageSuccess](state, { payload: { attributes: message } }) {
    const { byId, allIds } = state;
    if (allIds.includes(message.id)) {
      return state;
    }
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
},
{ byId: {}, allIds: [] });

const channels = handleActions({
  [actions.initChat](state, { payload: gon }) {
    const { channels: initChannels } = gon;
    return {
      byId: initChannels.reduce((acc, ch) => ({ ...acc, [ch.id]: ch }), {}),
      allIds: [...initChannels.map(({ id }) => id)],
    };
  },
},
{ byId: {}, allIds: [] });
const currentChannelId = handleActions(
  {
    [actions.initChat](state, { payload: { currentChannelId: currentId } }) {
      return currentId;
    },
  },
  null,
);

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  form: formReducer,
});
