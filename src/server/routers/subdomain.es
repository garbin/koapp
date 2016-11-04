import { subdomain } from 'koapi/lib/middlewares'
import { Router } from 'koapi'

export const router =  Router.define(router => {
  router.get('/', async(ctx)=>{
    ctx.body = 'subdomain api';
  })
});

export default subdomain('api.*', router.routes());
