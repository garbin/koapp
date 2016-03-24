import {fetch, createClient} from 'fetch-plus';

const api = createClient(config.api)

export {fetch, api};
