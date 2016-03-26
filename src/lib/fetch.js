import {fetch, createClient} from 'fetch-plus'
import json from 'fetch-plus-json'
import config from '../config';
console.log(config);

const api = createClient(config.api)
api.addMiddleware(json());

export {fetch, api};
