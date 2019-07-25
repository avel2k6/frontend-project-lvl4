import _ from 'lodash';
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
  [actions.addMessageSuccess](state, { payload: message }) {
    const { byId, allIds } = state;
    if (allIds.includes(message.id)) {
      return state;
    }
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.deleteChannelSuccess](state, { payload: channel }) {
    if (!channel) {
      return state;
    }
    const { byId } = state;
    const { id } = channel;
    const newById = _.omitBy(byId, message => message.channel * 1 === id * 1);
    return {
      byId: newById,
      allIds: Object.keys(newById),
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
  [actions.addChannelSuccess](state, { payload: { attributes: channel } }) {
    const { byId, allIds } = state;
    if (allIds.includes(channel.id)) {
      return state;
    }
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [...allIds, channel.id],
    };
  },
  [actions.renameChannelSuccess](state, { payload: channel }) {
    const { id } = channel;
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: channel },
      allIds,
    };
  },
  [actions.deleteChannelSuccess](state, { payload: channel }) {
    if (!channel) {
      return state;
    }
    const { byId, allIds } = state;
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
    [actions.initChat](state, { payload: { currentChannelId: id } }) {
      return id;
    },
    [actions.changeCurrentChannel](state, { payload: { id } }) {
      return id;
    },
  },
  null,
);

const uiNewChannel = handleActions(
  {
    [actions.toggleModalNewChannel](state) {
      const { modalWindow } = state;
      return {
        modalWindow: !modalWindow,
      };
    },
  },
  {
    modalWindow: false,
  },
);

const renamedChannelId = handleActions({
  [actions.toggleModalRenameChannel](state, { payload: channelId }) {
    return channelId || null;
  },
},
null);

const uiRenamedChannel = handleActions(
  {
    [actions.toggleModalRenameChannel](state) {
      const { modalWindow } = state;
      return { modalWindow: !modalWindow };
    },
  },
  { modalWindow: false },
);

const deletedChannelId = handleActions(
  {
    [actions.toggleModalDeleteChannel](state, { payload: channelId }) {
      return channelId || null;
    },
  },
  null,
);

const uiDeletedChannel = handleActions(
  {
    [actions.toggleModalDeleteChannel](state) {
      const { modalWindow } = state;
      return { modalWindow: !modalWindow };
    },
  },
  { modalWindow: false },
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
});
