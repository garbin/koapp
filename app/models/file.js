const { config, model, logger: log } = require('koapi')
const path = require('path')
const Joi = require('joi')
const { Client } = require('minio')
const mime = require('mime-types')
const moment = require('moment')
const fs = require('fs')
const Promise = require('bluebird')
const ulid = require('ulid')
const Storage = Promise.promisifyAll(new Client(config.get('storage.minio')))

/**
 * write:
 * let file = new File();
 * file.save({
 *   file_name: 'asbc.jpg',
 *   file_size: 1912812
 *   file_path: '/tmp/adfsdf' // local path
 * });
 */
module.exports = class File extends model.Base {
  get tableName () { return 'files' }
  serialize (options = {}) {
    let file = super.serialize(options)
    file.file_path = config.get('storage.root') + file.file_path
    return file
  }
  initialize () {
    this.on('saving', async (model, attrs, options) => {
      const attributes = Object.assign({}, model.attributes, attrs)
      if (attributes.file_path && this.hasChanged('file_path')) {
        let filePath = moment().format('YM/D/') + ulid() + path.parse(attributes.file_name).ext
        try { await Storage.makeBucketAsync('uploads', 'us-east-1') } catch (e) {}
        let fileType = attributes.file_type || mime.lookup(attributes.file_name) || 'application/octet-stream'
        let fileSize = attributes.file_size || fs.statSync(attributes.file_path).size
        await Storage.fPutObjectAsync('uploads', filePath, attributes.file_path, fileType)
        this.set({ file_path: filePath, file_type: fileType, file_size: fileSize })
      }
    })
    this.on('destroying', async (model, options) => {
      try {
        await Storage.removeObjectAsync('uploads', model.get('file_path'))
      } catch (e) {
        log.error(e)
      }
    })
    super.initialize()
  }

  static get fields () {
    return {
      title: Joi.string().empty(''),
      desc: Joi.string().empty(''),
      file_name: Joi.string().required(),
      file_type: Joi.string(),
      file_size: Joi.number().integer(),
      file_path: Joi.string().required()
    }
  }
  static get Storage () { return Storage }
}
