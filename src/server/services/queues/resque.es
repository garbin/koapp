import config from '../../../../config'
import log from 'koapi/lib/logger'
import resque from 'node-resque'

const jobs = {
  mailer:{
    perform(msg, cb){
      log.info('RESQUE: msg received, %s', JSON.stringify(msg));
      cb(null, 'received');
    }
  }
}


const instance  = new resque.queue({connection:config.redis}, jobs);
instance.on('error', log.error);
instance.connect(function(){});

export const worker = new resque.worker({connection:config.redis, queues:'*'}, jobs);

export const queue = {
  enqueue(func, msg, q = '*'){
    return new Promise(async (resolve, reject)=>{
      if (!instance.connection.connected) {
        await new Promise((ok, e)=>{
          instance.connect(ok);
        });
      }
      if (!instance.connection.connected) {
        return reject('resque connect failed!');
      }
      instance.enqueue(q, func, msg, e => e ? reject(e) : resolve());
    });
  }
}

export default async function () {
  return new Promise((resolve, reject)=>{
    worker.on('error', log.error);
    worker.connect(()=>{
      worker.workerCleanup();
      worker.start();
      log.info( 'Queue resque ready for jobs, PID: %s', process.pid);
      resolve();
    });
  });
}
