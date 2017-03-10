import { reduxers } from '../lib/helper'
import * as admin from './admin'
import * as table from './table'

export default reduxers({ admin, table })
