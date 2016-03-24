import {fetch, createClient} from 'fetch-plus';
import config from '../config';

const api = createClient(config.api)

export {fetch, api};
