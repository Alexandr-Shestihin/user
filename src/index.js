import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import App from './App';

import {GTM_ID} from "./config";

const tagManagerArgs = {
    gtmId: GTM_ID
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(<App />, document.getElementById('root'));