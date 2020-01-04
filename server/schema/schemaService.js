const { errorAndAdditionalInfo } = require("../util/response")
const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true
});

exports.validate = (schemaName, data, response) => {
  const valid = ajv.validate(schemaName, data)
  const validatonError = ajv.errors

  if (valid)
    return true
  else
    errorAndAdditionalInfo(
      response, 400, { en: "Error in input validation!", fa: "خطا در اعتبار سنجی داده های ورودی!" }, validatonError
    )
}
