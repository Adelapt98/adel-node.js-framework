const { signUp } = require('./controller/userController')
const path = require('path')
const { error } = require('./util/response')

module.exports = app => {
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.put('/api/signup', signUp)

  app.get('/api/user/:userId', getProfile)
  app.post('/api/user', updateUser)

  app.get('/api/customer/:customerId', getCustomerProfile)
  app.post('/api/customer', updateCustomer)

  app.get('/api/suplier/:suplierId', getSupplierProfile)
  app.post('/api/suplier', updateSuplier)

  
}
