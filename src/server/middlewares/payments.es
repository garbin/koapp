import { Alipay, Stripe } from 'paymentjs/lib/gateways'


export default function () {
  return async (ctx, next)=>{
    ctx.state.payments = {
      alipay: new Alipay({
        // ... config
      }),
      stripe: new Stripe({
        key: 'sk_test_LPIE20HyBixCrxjCpwC9zLlI'
        // ...config
      })
    };
    await next();
  }
}
