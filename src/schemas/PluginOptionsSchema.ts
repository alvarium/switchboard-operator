import SchemaObject from 'schema-object'

export const HTTPPluginOptionsSchema = new SchemaObject({
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT']
  },
  merge: {
    type: Boolean,
    required: false
  },
  mergeTarget: {
    type: String,
    required: false
  }
})

const ConditionSchema = new SchemaObject({
  field: {
    type: String,
    required: true
  },
  operation: {
    type: String,
    required: true,
    enum: [
      '===',
      '!==',
      'defined',
      'undefined',
      'empty',
      'notEmpty',
      'isTrue',
      'isFalse',
      'true',
      'false',
      true,
      false,
    ]
  },
  checkValue: {
    type: String
  }
})

export const ConditionalPluginOptionsSchema = new SchemaObject({
  conditions: {
    type: Array,
    arrayType: ConditionSchema,
    required: true
  }
})

export const MapperPluginOptionsSchema = new SchemaObject({
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

export const MergerPluginOptionsSchema = new SchemaObject({
  sourceFields: {
    type: Array,
    required: true
  },
  targetField: {
    type: String,
    required: true
  }
})


export const Prev2TaskPluginOptionsSchema = new SchemaObject({
  target: {
    type: String,
    required: true
  },
  targetRoute: {
    type: String,
    required: true
  }
})

export const SetterPluginOptionsSchema = new SchemaObject({
  fields: {
    type: Object,
    required: true
  }
})


export const TelegramPluginOptionsSchema = new SchemaObject({
  token: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: false,
  },
  inlineMessageId: {
    type: String,
    required: false,
  },
  messageId: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
  // Does not match with telegram API spec.. sorry for that
  template: {
    type: String,
    required: true,
  },
  parseMode: {
    type: String,
    required: false,
    enum: ['markdown', 'html'],
  },
  disableWebPagePreview: {
    type: Boolean,
    required: false,
  },
  disableNotification: {
    type: Boolean,
    required: false,
  },
  replyMarkup: {
    type: Object,
    required: false,
  },
  replyToMessageId: {
    type: Number,
    required: false,
  },
  path: {
    type: String,
    required: false,
  },
})

export const TemplatePluginOptionsSchema = new SchemaObject({
  fields: {
    type: Object,
    required: true
  }
})
