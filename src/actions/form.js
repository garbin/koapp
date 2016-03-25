import {SUBMIT} from '../constants';
export function submit (data) {
  return {
    type: SUBMIT,
    payload: data,
  }
}
