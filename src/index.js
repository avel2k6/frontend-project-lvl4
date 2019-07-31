import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import { internet } from 'faker';
import cookies from 'js-cookie';
import initApp from './app.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


const getUserName = () => {
  if (cookies.get('userName')) {
    return cookies.get('userName');
  }
  const userName = internet.userName();
  cookies.set('userName', userName, { expires: 360 });
  return userName;
};

const userName = getUserName();

const { gon } = window;
initApp(gon, userName);
