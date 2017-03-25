import { reduxers } from '../lib/helper'
import * as common from './common'
import * as checklist from './checklist'
import * as async from './async'

export default reduxers({ common, checklist, async })
