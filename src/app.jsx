import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

export default (gon) => {
  render(
    <App gon={gon}/>,
    document.getElementById('chat'),
  );
}
