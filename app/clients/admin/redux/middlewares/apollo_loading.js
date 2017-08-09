import { showLoading, hideLoading } from 'react-redux-loading-bar'
export default store => next => action => {
  if (/APOLLO_(.*?)_INIT/.test(action.type)) {
    store.dispatch(showLoading())
  } else if (
    /APOLLO_(.*?)_RESULT(_CLIENT)?/.test(action.type) ||
    /APOLLO_(.*?)_ERROR/.test(action.type)
  ) {
    store.dispatch(hideLoading())
  }
  return next(action)
}
