import { reduxers } from '../lib/helper'
import * as asyncReduxer from './async'
import * as counter from './counter'
import * as website from './website'

export default reduxers({
  async: asyncReduxer, counter, website
})
