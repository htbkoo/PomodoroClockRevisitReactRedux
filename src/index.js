// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import documentUtil from "./utils/documentUtil";

const ROOT_CONTAINER_SELECTOR = 'root';
const rootEl = documentUtil.getElementOrThrow({id: ROOT_CONTAINER_SELECTOR, document});
ReactDOM.render(<App/>, rootEl);
registerServiceWorker();
