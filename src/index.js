import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
// import './i18n.js';
import initApp from './app.jsx';
// import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { gon } = window;
initApp(gon);
