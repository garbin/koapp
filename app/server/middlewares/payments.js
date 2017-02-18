const { Alipay, Stripe } = require('paymentjs/lib/gateways')

exports.default =  function () {
  return async (ctx, next) => {
    ctx.state.payments = {
      alipay: new Alipay({
        // ... config
      }),
      stripe: new Stripe({
        key: 'sk_test_LPIE20HyBixCrxjCpwC9zLlI'
      })
    }
    await next()
  }
}
