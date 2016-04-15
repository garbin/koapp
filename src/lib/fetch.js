import {fetch, createClient} from 'fetch-plus'
import json from 'fetch-plus-json'
import config from '../config';

var bearer = token => request => {
	request.options.headers["Authorization"] = "Bearer " + token();
};

const api = createClient(config.api)
api.addMiddleware(json());
api.addMiddleware(bearer(function(){
  return localStorage.access_token;
}));

export {fetch, api};
