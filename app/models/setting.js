const { bookshelf } = require('koapi/lib/model')
const Joi = require('joi')

const Shipping = exports.Shipping = class {
  static async get (id) {
    let settings = await Setting.findById('shippings')
    let shipping = settings.get('settings').carriers.find(carrier => carrier.id === id)

    return new Shipping(shipping.config)
  }
  constructor (config) {
    this.config = config
  }
  calc (region, orderAmount, items) {
    let { caculators } = this.config
    let shippingFees = []
    caculators.forEach(caculator => {
      let shippingFee = this[`calc${caculator.type}`](region, items, caculator.rule, orderAmount)
      shippingFees.push(shippingFee)
    })

    return Math.max(...shippingFees)
  }
  calcFixed (region, items, rule) {
    return rule
  }
  calcPriceBased (region, items, rule, orderAmount) {
    let current = rule.find(r => r.min <= orderAmount && (r.max !== -1 ? orderAmount < r.max : 1))

    return current.amount
  }
  calcWeightBased (region, items, rule) {
    let weightTotal = items.reduce((total, item) => { total += item.weight * item.quantity; return total }, 0)
    let current = rule.find(r => r.min <= weightTotal && (r.max !== -1 ? weightTotal < r.max : 1))

    return current.amount
  }
}

const Setting = exports.default = class extends bookshelf.Model {
  get tableName () { return 'settings' }
  get hasTimestamps () { return false }
  static get fields () {
    return {
      name: Joi.string().required(),
      desc: Joi.string().required(),
      settings: Joi.object().required()
    }
  }
}
