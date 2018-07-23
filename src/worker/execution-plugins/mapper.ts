import Action from "../../model/Action";
import logger from '../../services/logger'

const debug = require('debug')('mapper-plugin')
const objectMapper = require('object-mapper')
const SchemaObject = require('schema-object')


const PluginOptionsSchema = new SchemaObject({
  merge: {
    type: Boolean,
    required: false
  },
  copy: {
    type: Array,
    required: false
  },
  fields: {
    type: Object,
    required: true
  }
})

export default class ObjectTransformerPlugin {
  msg: string
  action: Action
  options: any
  preLog: string

  constructor(msg, action, preLog) {
    this.msg = msg
    this.action = action
    debug('received next msg: %j', this.msg)
    debug('received next action: %j', this.action)

    // Getting the last of previous results comming from previous plugins
    this.options = new PluginOptionsSchema(action.options)

    debug(
      'Instance transformer plugin with options: %j and msg: %j',
      this.options,
      this.msg
    )

    if (this.options.isErrors()) {
      throw new Error('The options provided are not valid '+ JSON.stringify(this.options.getErrors()))
    }

    this.preLog = preLog + ' > ' + action.name
  }

  execute(callback) {
    let transformedObj = objectMapper(
      this.msg,
      this.options.fields
    )

    if (this.options.copy.length) {
      this.options.copy.forEach((copy) => {
        transformedObj[copy] = this.msg
      })
    }

    debug('Result mapped object is %j', transformedObj)
    logger.info(this.preLog, 'Object mapping applied')

    if (this.options.merge) {
      return callback(null, Object.assign({}, this.msg, transformedObj))
    } else {
      return callback(null, transformedObj)
    }
  }
}