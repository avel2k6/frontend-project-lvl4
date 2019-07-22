import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import initApp from './app.jsx';
import axios from 'axios';
import routes from './routes.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { gon } = window;
console.log(routes.channelsPath());
axios.get(routes.channelsPath())
 .then(
    (res) => {
      console.log(res);
    }
  )
  .catch(
    e => console.log(e)
  );
initApp(gon);
