// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const ROOT_CONTAINER_SELECTOR = 'root';
const rootEl = document.getElementById(ROOT_CONTAINER_SELECTOR);
if (!(rootEl instanceof Element)) {
    throw new Error('invalid type');
}
ReactDOM.render(<App/>, rootEl);
registerServiceWorker();
