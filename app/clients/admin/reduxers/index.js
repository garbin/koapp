import { reduxers } from '../lib/helper'
import * as common from './common'
import * as checklist from './checklist'
import * as async from './async'
import * as table from './table'

export default reduxers({ common, checklist, table, async })
