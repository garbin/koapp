import config from '../config'
import axios from 'axios'

const api = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use(function (config) {
	// Do something before request is sent
	config.headers["Authorization"] = "Bearer " + localStorage.access_token;
 	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

export {axios, api};
