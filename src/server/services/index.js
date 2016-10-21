import queue from './queue'
import scheduler from './scheduler'

export default {
  master: [ scheduler ],
  worker: [ queue ]
};
