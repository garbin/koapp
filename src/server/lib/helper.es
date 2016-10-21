import path from 'path'
import _ from 'lodash'

export function storage(relative) {
  return path.resolve(__dirname + '/../../../storage' + relative);
};

export const base64 = {
  decode(str){
    return (new Buffer(str, 'base64')).toString();
  },
  encode(obj){
    let str = _.isString(obj) ? obj : JSON.stringify(obj);
    return (new Buffer(str)).toString('base64');
  }
}
