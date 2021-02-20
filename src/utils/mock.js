import AxiosMockAdapter from 'axios-mock-adapter';

import axios from 'axios';

let aax = axios.create();

const instance = new AxiosMockAdapter(axios, { delayResponse: 0 });

export default instance;
