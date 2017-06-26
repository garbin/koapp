const { get } = require('lodash')
const compose = require('just-compose')

function authenticated (resolver) {
  return async (root, args, ctx, info) => {
    if (!ctx.user) {
      throw new Error('login required')
    }
    return resolver(root, args, ctx, info)
  }
}

function grant (permission) {
  return compose(authenticated, resolver => {
    return async (root, args, ctx, info) => {
      await ctx.user.load('roles')
      const passed = ctx.user.related('roles').find(role => {
        // super role
        if (role.get('permissions') === true) return true
        // check permission item
        return get(role.get('permissions').features, permission) === true
      })
      if (!passed) {
        throw new Error(`Access Denied - You don't have permission to: ${permission}`)
      }
      const result = await resolver(root, args, ctx, info)
      return result
    }
  })
}

module.exports = {
  authenticated,
  grant,
  compose
}
