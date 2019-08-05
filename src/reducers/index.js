import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.initChat](state, { payload: gon }) {
    const { messages: initMessages } = gon;
    return {
      byId: _.keyBy(initMessages, ({ id }) => id),
      allIds: [...initMessages.map(({ id }) => id)],
    };
  },
  [actions.addMessageSuccess]({ byId, allIds }, { payload: message }) {
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.deleteChannelSuccess](state, { payload: channel }) {
    const { byId } = state;
    const { id } = channel;
    const newById = _.omitBy(byId, message => message.channelId === id);
    return {
      byId: newById,
      allIds: Object.keys(newById).map(Number),
    };
  },
  [actions.updateMessagesSuccess]({ byId }, { payload: messagesData }) {
    const newMessagesById = messagesData.reduce(
      (acc, data) => {
        const { id, attributes } = data;
        return {
          ...acc,
          [id]: attributes,
        };
      },
      {},
    );
    const allMessages = { ...byId, ...newMessagesById };
    return {
      byId: allMessages,
      allIds: Object.keys(allMessages).map(Number),
    };
  },
},
{ byId: {}, allIds: [] });

const channels = handleActions({
  [actions.initChat](state, { payload: gon }) {
    const { channels: initChannels } = gon;
    return {
      byId: _.keyBy(initChannels, ({ id }) => id),
      allIds: [...initChannels.map(({ id }) => id)],
    };
  },
  [actions.addChannelSuccess]({ byId, allIds }, { payload: { attributes: channel } }) {
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.renameChannelSuccess]({ byId, allIds }, { payload: channel }) {
    const { id } = channel;
    return {
      byId: { ...byId, [id]: channel },
      allIds,
    };
  },
  [actions.deleteChannelSuccess]({ byId, allIds }, { payload: channel }) {
    const { id } = channel;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
},
{ byId: {}, allIds: [] });

const currentChannelId = handleActions(
  {
    [actions.initChat](state, { payload: { currentChannelId: id } }) { return id; },
    [actions.changeCurrentChannel](state, { payload: { id } }) { return id; },
  },
  null,
);

const uiNewChannel = handleActions(
  {
    [actions.toggleModalNewChannel]({ modalWindow }) { return { modalWindow: !modalWindow }; },
    [actions.addChannelSuccess]() { return { modalWindow: false }; },
  },
  { modalWindow: false },
);

const renamedChannelId = handleActions({
  [actions.toggleModalRenameChannel](state, { payload: channelId }) { return channelId || null; },
  [actions.renameChannelSuccess]() { return null; },
},
null);

const uiRenamedChannel = handleActions(
  {
    [actions.toggleModalRenameChannel](state) {
      const { modalWindow } = state;
      return { modalWindow: !modalWindow };
    },
    [actions.renameChannelSuccess]() { return { modalWindow: false }; },
  },
  { modalWindow: false },
);

const deletedChannelId = handleActions(
  {
    [actions.toggleModalDeleteChannel](state, { payload: channelId }) { return channelId || null; },
    [actions.deleteChannelSuccess]() { return null; },
  },
  null,
);

const uiDeletedChannel = handleActions(
  {
    [actions.toggleModalDeleteChannel]({ modalWindow }) { return { modalWindow: !modalWindow }; },
    [actions.deleteChannelSuccess]() { return { modalWindow: false }; },
  },
  { modalWindow: false },
);

const errors = handleActions(
  {
    [actions.addWarning](state, { payload: error }) { return { ...state, warning: error }; },
    [actions.addMessageSuccess](state) { return { ...state, warning: null }; },
    [actions.addChannelSuccess](state) { return { ...state, warning: null }; },
    [actions.appIsOffline](state) { return { ...state, offline: true }; },
    [actions.updateMessagesSuccess](state) { return { ...state, offline: false }; },
  },
  {
    warning: null,
    offline: false,
  },
);

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  renamedChannelId,
  deletedChannelId,
  uiNewChannel,
  uiRenamedChannel,
  uiDeletedChannel,
  form: formReducer,
  errors,
});
