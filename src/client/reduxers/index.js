import _ from 'lodash'
import * as async_reduxer from './async'
import * as counter from './counter'
import * as website from './website'

const reduxers = { async: async_reduxer, counter, website };


export const actions = _.mapValues(reduxers, reduxer => reduxer.actions);
export const reducer = _.transform(reduxers, (result = {}, reduxer)=> Object.assign(result, reduxer.reducer));
export default actions;
