const Author = require('../model/author')
const Account = require('../model/account')
const Cart = require('../model/cart')
const Shelve = require('../model/shelve')
const History = require('../model/history')

let checkName = (name) => {
    return new Promise (async (resolve, reject) => {
        try {
            let check = await Author.findOne({name})
            if (!check) {
                resolve(false)
            } else {
                resolve(check)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmail = (email) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let check = await Author.findOne({email})
            if (!check) {
                resolve (false)
            } else {
                resolve (check)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let registerAuthorSevice =  (data) => {   
    return new Promise (async(resolve, reject) => {
        try {
            let {name, password, email} = data
            let nameCheck = await checkName(name)
            let emailCheck = await checkEmail(email)
            if (nameCheck) {
                resolve({
                    messageVI:`Tài khoản ${name} đã tồn tại`,
                    messageEN: `Account ${name} already exists`
                })
            }
            else if (emailCheck) {
                resolve({
                    messageVI: 'Email này đã tồn tại',
                    messageEN:'Email is exist'
                })
            } 
            else {
                const newAuthor = new Author(data)
                newAuthor.save()

                resolve({
                    messageEN:'Logged in successfully',
                    messageVI:'Đăng ký thành công'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let checkNamePasswordLogin = (name, password) => {
    return new Promise (async (resolve, reject) => {
        try {
            let check = await Author.findOne({name})
            if (!check) {
                resolve(false)
            } else {
                if (password !== check.password) {
                    resolve(1)
                } 
                if ( password === check.password) {
                    resolve(check)
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}


let loginAuthorSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let {name, password} = data
            let checkNamePassword = await checkNamePasswordLogin(name, password)
            if (!checkNamePassword) {
                resolve({
                    messageEN:'Account does not exist',
                    messageVI: 'Tài khoản không tồn tại'
                })
            } 
            if (checkNamePassword === 1) {
                resolve({
                    messageEN:'Incorrect password',
                    messageVI:'Mật khẩu không chính xác'
                })
            }
            if (checkNamePassword ) {
                resolve({
                    messageEN:'Logged in successfully',
                    messageVI:'Đăng nhập thành công'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let registerAccountSevice = (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let {username, email, phone} = data
            let checkUsername = await Account.findOne({username})
            
            if (checkUsername) {
                resolve({
                    messageVI:`Tài khoản ${checkUsername.username} đã tồn tại`,
                    messageEN: `Account ${checkUsername.username} already exists`
                })
            } else {
                let checkEmail = await Account.findOne({email})
                if (checkEmail) {
                    resolve({
                        messageVI: 'Email này đã tồn tại',
                        messageEN:'Email is exist'
                    })
                } else {
                    let checkPhone = await Account.findOne({phone})
                    if (checkPhone) {
                        resolve({
                            messageEN: 'The phone number is already in use',
                            messageVI:'Số điện thoại đã được sử dụng'
                        })
                    } else {
                        const newAccount = new Account(data)
                        newAccount.save()
                        let newShelve = {
                            shelveName: data.username,
                            bookIds:[]
                        }
                        let newCart = {
                            cartName : data.username,
                            bookList : []
                        }
                        let newHistory = {
                            historyName:data.username,
                            historyList:{}
                        }
                        new Shelve(newShelve).save()
                        new Cart(newCart).save()
                        new History(newHistory).save()

                        resolve({
                            messageEN:'Logged in successfully',
                            messageVI:'Đăng ký thành công'
                        })
                    }
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

let loginAccountSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let {username, password} = data
            let checkUsernamePassword = await Account.findOne({username})
            if (!checkUsernamePassword) {
                resolve({
                    messageEN:'Account does not exist',
                    messageVI: 'Tài khoản không tồn tại'
                })
            }

            if (checkUsernamePassword) {
                let checkPassword = checkUsernamePassword.password
                if (password !== checkPassword) {
                    resolve({
                        messageEN: 'Incorrect password',
                        messageVI: 'Mật khẩu không chính xác'
                    })
                } else {
                    resolve({
                        messageEN:' Logged in successfully',
                        messageVI:'Đăng nhập thành công'
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

let forgotPasswordAuthorSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let {email , newPassword} = data
            let checkEmail = await Author.findOne({email})
            if (!checkEmail) {
                resolve({
                    messageEN:'Email does not exist',
                    messageVI:'Email không tồn tại'
                })
            } else {
                checkEmail.password = newPassword
                let check = await checkEmail.save()
                
                if (!check) {
                    resolve({
                        messageEN:'Password update failed',
                        messageVI:'Cập nhật mật khẩu thất bại'
                    })
                } else {
                    resolve ({
                        messageEN: 'Updated password successfully',
                        messageVI: 'Cập nhật mật khẩu thành công'
                    })
                }
            }
        } catch (error) {
            reject({
                messageEN:'ERROR from to server',
                messageVI:'Có lỗi từ phía server'
            })
        }
    })
}

let forgotPasswordAccountSevice = (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let { email, newPassword} = data
            let checkEmail = await Account.findOne({email})

            if (!checkEmail) {
                resolve({
                    messageEN:'Email does not exist',
                    messageVI:'Email không tồn tại'
                })
            } else {
                checkEmail.password = newPassword
                let check = checkEmail.save()

                if (!check) {
                    resolve({
                        messageEN:'Password update failed',
                        messageVI:'Cập nhật mật khẩu thất bại'
                    })
                } else {
                    resolve({
                        messageEN:'Updated password successfully',
                        messageVI:'Cập nhật mật khẩu thành công'
                    })
                }
            } 
        } catch (error) {
            reject({
                messageEN:'ERROR from to server',
                messageVI:'Có lỗi phía server'
            })
        }
    })
}

let getInfoAccount = async (req, res, next) => {
    try {
        let user = await Account.findOne({username: req.body.username})
        if (!user) {
            return res.status(200).json({
                messageEN:'User does not exist',
                messageVI:'Người dùng không tồn tại'
            })
        } else {
            delete user.password
            console.log(user)
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let getInfoAuthor = async (req, res, next) => {
    try {
        let name = await Author.findOne({name: req.body.name})
        if (!name) {
            return res.status(200).json({
                messageEN:'User does not exist',
                messageVI:'Người dùng không tồn tại'
            })
        } else {
            delete name.password
            return res.status(200).json(name)
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let changePasswordAuthorSevice = (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let {oldPassword, newPassword, email} = data
            let checkEmail = await Author.findOne({email})

            if (!checkEmail) {
                resolve({
                    messageEN:'Email does not exist',
                    messageVI:'Email không tồn tại'
                })
            } else {
                if (oldPassword !== checkEmail.password) {
                    resolve({
                        messageEN: 'Incorrect password',
                        messageVI: 'Mật khẩu không đúng'
                    })
                } else {
                    checkEmail.password = newPassword
                    let check = checkEmail.save()

                    if (!check) {
                        resolve(200).json({
                            messageEN: 'Password update failed',
                            messageVI: 'Cập nhật mật khẩu thất bại'
                        })
                    } else {
                        resolve({
                            messageEN: 'Updated password successfully',
                            messageVI: 'Cập nhật mật khẩu thành công'
                        })
                    }
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let changePasswordAccountSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let {email, newPassword, oldPassword} = data
            let checkEmail = await Account.findOne({email})
             
            if (!checkEmail) {
                resolve({
                    messageEN:'Email does not exist',
                    messageVI: 'Email không tồn tại'
                })
            } else {
                if (oldPassword !== checkEmail.password) {
                    resolve({
                        messageEN: 'Incorrect password',
                        messageVI: 'Mật khẩu không đúng'
                    })
                } else {
                    checkEmail.password = newPassword
                    let check = checkEmail.save()

                    if (!check) {
                        resolve({
                            messageEN: 'Password update failed',
                            messageVI:'Cập nhật mật khẩu thất bại'
                        })
                    } else {
                        resolve({
                            messageEN:'Updated password successfully',
                            messageVI: 'Cập nhật mật khẩu thành công'
                        })
                    }
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let editInforAuthorSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let {name, email, birthDay, gentleId, description} = data[0]
            let author = await Author.findOne({_id : data[1].query.id})

            if (!author) {
                resolve({
                    messageEN:'User not found',
                    messageVI: 'Không tìm thấy người dùng'
                })
            } else {
                author.name = name
                author.email = email
                author.birthDay = birthDay
                author.gentleId = gentleId
                author.description = description
                let check = await author.save()

                if (!check) {
                    resolve({
                        messageEN:'Update information failed',
                        messageVI:'Cập nhật thông tin thất bại'
                    })
                } else {
                    resolve({
                        messageEN:'Successfully updated',
                        messageVI: 'Cập nhật thông tin thành công',
                        author
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let editInforAccountSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let { username, email, phone} = data[0]
            let account = await Account.findOne({_id : data[1].query.id})

            if (!account) {
                resolve({
                    messageEN: 'User not found',
                    messageVI:'Không tìm thấy người dùng'
                })
            } else {
                account.username = username
                account.email = email
                account.phone = phone
                let check = account.save()

                if (!check) {
                    resolve({
                        messageEN:'Update information failed',
                        messageVI: 'Cập nhật thông tin thất bại'
                    })
                } else {
                    resolve ({
                        messageEN: 'Successfully updated',
                        messageVI: 'Cập nhật thông tin thành công',
                        account
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    registerAuthorSevice,
    loginAuthorSevice,
    registerAccountSevice,
    loginAccountSevice,
    forgotPasswordAuthorSevice,
    forgotPasswordAccountSevice,
    getInfoAccount,
    getInfoAuthor,
    changePasswordAuthorSevice,
    changePasswordAccountSevice,
    editInforAuthorSevice,
    editInforAccountSevice,
}
