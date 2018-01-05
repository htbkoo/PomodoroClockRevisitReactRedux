// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import documentUtil from "./utils/documentUtil";

import './index.css';

const ROOT_CONTAINER_SELECTOR = 'root';

let rootEl = documentUtil.getElementOrThrow({id: ROOT_CONTAINER_SELECTOR, document});
ReactDOM.render(<App/>, rootEl);

registerServiceWorker();
