const db = require('../db/postgresql')

const {
    passwordPolicy,
    createHash
} = require('../auth/auth')

const getUserByUserName = (userName) => {
    return db.executeQuery(`SELECT * FROM user WHERE is_active = true AND is_deleted = false AND user_name = '${userName}'`)
}

const signUp = (data) => {
    getUserByUserName(data.userName)
        .then((res) => {
            const user = res.rows[0]
            if (user === undefined) { // یوزرنیم تکراری نیست
                // 1. check password is valid
                const passwordChecked = passwordPolicy.check(data.password)
                if (passwordChecked) {
                    const { salt, passwordHash } = createHash(data.password)
                    const user = {
                        userName: data.userName,
                        phoneNumber: data.phoneNumber,
                        salt,
                        passwordHash
                    }
                    userService.addUser(user)
                        .then((res) => {
                            responseBody = {
                                status: 'ok',
                                result: result.rows[0]
                            }
                            ok(response, responseBody)
                        })
                        .catch((err) => {
                            responseBody = {
                                status: 'error',
                                message: err.message
                            }
                            error(response, responseBody)
                        })
                } else {
                    responseBody = {
                        status: 'error',
                        message: `Password should have At least 8 characters in length,
                  and should contain upper case letters (A-Z),
                  lower case letters (a-z),
                  numbers
                  and special characters (e.g. !@#$%^&*)`
                    }
                    error(response, responseBody)
                }
            }
            else {
                responseBody = {
                    status: 'error',
                    message: 'UserName is already exists in the database'
                }
                error(response, responseBody)
            }
        })
        .catch((err) => {
            responseBody = {
                status: 'error',
                message: err.message
            }
            error(response, responseBody)
        })
}

const addUser = (user) => {
    user.signUpTime = new Date()
    return db.insertOrUpdate(
        `INSERT INTO "User" 
                             ( 
                                         "userName",
                                         "passwordHash",
                                         "salt",
                                         "signUpTime",
                                         "phoneNumber"
                             ) 
                             VALUES 
                             (  
                                         '${user.userName}',
                                         '${user.passwordHash}',
                                         '${user.salt}',
                                         ${user.signUpTime},
                                         ${user.phoneNumber}
                             )`)
}
exports.signUp = signUp
exports.addUser = addUser
exports.getUserByUserName = getUserByUserName