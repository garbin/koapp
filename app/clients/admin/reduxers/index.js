import { reduxers } from '../lib/helper'
import * as admin from './admin'
import * as check from './check'
import * as async from './async'

export default reduxers({ admin, check, async })
