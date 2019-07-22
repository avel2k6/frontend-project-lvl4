import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import initApp from './app.jsx';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { gon } = window;
initApp(gon);
