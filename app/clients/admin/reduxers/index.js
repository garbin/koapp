import { reduxers } from '../lib/helper'
import * as admin from './admin'
import * as checklist from './checklist'
import * as async from './async'
import * as table from './table'

export default reduxers({ admin, checklist, table, async })
