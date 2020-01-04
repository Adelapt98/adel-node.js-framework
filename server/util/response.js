exports.ok = (response, data, message) => {
  let responseBody = {
    status: 'ok',
    message: {
      en: message.en || 'Request was successful',
      fa: message.fa ||'درخواست موفقیت آمیز بود'
    },
    result: data
  }
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(responseBody))
  response.end()
}

exports.error = (response, statusCode, message) => {
  let responseBody = {
    status: 'error',
    message: {
      en: message.en || 'Request was not successful!',
      fa: message.fa ||'درخواست موفقیت آمیز نبود!'
    }
  }
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(responseBody))
  response.end()
}

exports.errorAndAdditionalInfo = (response, statusCode, message, additionalInfo) => {
  let responseBody = {
    status: 'error',
    message: {
      en: message.en || 'Request was not successful!',
      fa: message.fa ||'درخواست موفقیت آمیز نبود!'
    },
    additionalInfo: additionalInfo
  }
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(responseBody))
  response.end()
}