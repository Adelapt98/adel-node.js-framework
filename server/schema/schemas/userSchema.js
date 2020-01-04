exports.signUp = {
  type: 'object',
  additionalProperties: false,
  required: [
    'userName',
    'password',
    'phoneNumber'
  ],
  properties: {
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    }
  }
}