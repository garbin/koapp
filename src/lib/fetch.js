import {fetch, createClient} from 'fetch-plus'
import json from 'fetch-plus-json'

const api = createClient(config.api)
api.addMiddleware(json());

export {fetch, api};
