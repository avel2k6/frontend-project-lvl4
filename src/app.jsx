import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';
import UsernameContext from './components/UsernameContext';


import {
  initChat, listenNewMessage, listenNewChannel, listenRenameChannel, listenDeleteChannel,
} from './actions';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = (ext) ? ext() : null;
/* eslint-enable */

const composeMiddleware = ext
  ? compose(applyMiddleware(thunk), devtoolMiddleware)
  : compose(applyMiddleware(thunk));


const store = createStore(
  reducers,
  composeMiddleware,
);


export default (gon, userName) => {
  store.dispatch(initChat(gon));
  listenNewMessage(store.dispatch);
  listenNewChannel(store.dispatch);
  listenRenameChannel(store.dispatch);
  listenDeleteChannel(store.dispatch);

  render(
    <Provider store={store}>
      <UsernameContext.Provider value={userName}>
        <App gon={gon} />
      </UsernameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
