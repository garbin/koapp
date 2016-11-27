import { Router } from 'koapi'
import { Order } from 'paymentjs'
import payments from '../middlewares/payments'

export default Router.define(router => {
  router.get('/cashier/:gateway', payments(), async(ctx, next) => {
    let payment = ctx.state.payments[ctx.params.gateway]
    let response = await payment.purchase(new Order({
      amount: 100,
      currency: 'usd'
    }), {
      source: 'tok_19C08gDvGKCCy6nqYnyNECi5'
    })
    if (response.isRedirect()) {
      ctx.body = await response.redirect()
    } else if (await response.isSuccess()) {
      ctx.body = 'success'
    } else {
      ctx.body = response.body
    }
  })
  router.get('/cashier/:gateway/callback', payments(), async(ctx, next) => {
    let payment = ctx.state.payments[ctx.params.gateway]
    let response = await payment.response(ctx.request.query)
    if (await response.isSuccess()) {
      ctx.body = 'success'
    } else {
      ctx.body = response.body
    }
  })
})
