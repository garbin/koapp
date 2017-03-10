import { reduxers } from '../lib/helper'
import * as admin from './admin'
import * as check from './check'
import * as async from './async'
import * as table from './table'

export default reduxers({ admin, check, table, async })
