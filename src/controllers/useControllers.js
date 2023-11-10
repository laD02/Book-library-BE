const useSevice = require('../sevices/useSevice')

let registerAuthor =  async (req, res, next) =>{
    try{
        let { name, gentleId, password, description, repassword, email, birthDay} = req.body
        let array = ['name', 'gentleId', 'password', 'repassword', 'email']
        for( i=0; i < array.length; i++){
            if (req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN: `Missing enter ${array[i]} in request`,
                    messageVI: `Bạn chưa nhập ${array[i]}`
                })
            }
        }
        
        if(repassword !== password ) {
            return res.status(200).json({
                messageEN:'Invalid re-entered password',
                messageVI:'Mật khẩu nhập lại không hợp lệ'
            })
        }
        
        let response = await useSevice.registerAuthorSevice(req.body)
        return res.status(200).json(response)

    }catch (error){
        return res.status(200).json({
            messageEN:'ERROR from to server ',
            messageVI: 'Có lỗi từ phía server '
        })
    }
}

let loginAuthor = async (req, res, next) => {
    try {
        let { name, password} = req.body
        let array = ['name', 'password']
        for(i = 0; i < array.length; i++) {
            if(req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN:`Missing enter ${array[i]} in request`,
                    messageVI:`Bạn chưa nhập ${array[i]}`
                })
            }
        }

        let response = await useSevice.loginAuthorSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server ',
            messageVI: 'Có lỗi từ phía server '
        })
    }
}

let registerAccount = async (req, res, next) => {
    try {
        let { username, password, rePassword, email, phone } = req.body
        let array = ['username', 'password', 'rePassword', 'email', 'phone']
        for (i = 0; i < array.length; i++) {
            if (req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN:`Missing enter ${array[i]} in request`,
                    messageVI:`Bạn chưa nhập ${array[i]}`
                })
            }
        }

        if ( password !== rePassword) {
            return res.status(200).json({
                messageEN: 'Invalid re-entered password',
                messageVI: 'Mật khẩu nhập lại không hợp lệ'
            })
        }

        let response = await useSevice.registerAccountSevice(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(200).json({
                messageEN:'ERROR from to server ',
                messageVI: 'Có lỗi từ phía server '
            })
    }
}

let loginAccount = async (req, res, next) => {
    try {
        let {username, password } = req.body
        let array =['username', 'password']
        for (i = 0; i < array.length; i++) {
            if (req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN: `Missing enter ${array[i]} in request`,
                    messageVI: `Bạn chưa nhập ${array[i]}`
                })
            }
        }

        let response = await useSevice.loginAccountSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server ',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let forgotPasswordAuthor = async (req, res, next) => {
    try {
        let {email, newPassword, reNewPassword} =req.body
        let array = ['email', 'newPassword', 'reNewPassword'] 
        for (let i = 0; i < array.length; i++) {
            if ( req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN:`Missing enter ${array[i]} in request`,
                    messageVI:`Bạn chưa nhập ${array[i]}`
                })
            }
        }

        if (newPassword !== reNewPassword) {
            return res.status(200).json({
                messageEN:'Re-entered password is invalid',
                messageVI:'Mật khẩu nhập lại không hợp lệ'
            })
        }

        let response = await useSevice.forgotPasswordAuthorSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

let forgotPasswordAccount = async (req, res, next) => {
    try {
        let { email, newPassword, reNewPassword} = req.body
        let array = ['email', 'newPassword', 'reNewPassword']
        for (i = 0; i < array.length; i++) {
            if (req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN:`Missing enter ${array[i]} in request`,
                    messageVI:` Bạn chưa nhập ${array[i]}`
                })
            }
        }

        if (newPassword !== reNewPassword)  {
            return res.status(200).json({
                messageEN:'Re-entered password is invalid',
                messageVI:'Mật khẩu nhập lại không hợp lệ'
            })
        }

        let response = await useSevice.forgotPasswordAccountSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let changePasswordAuthor  = async (req, res, next) => {
    try {
        let {email, oldPassword, newPassword, reNewPassword} = req.body
        let array = ['oldPassword', 'newPassword', 'reNewPassword', 'email']
        
        for (i = 0; i < array.length; i++) {
            if (req.body[array[i]] === undefined) {
                return res.status(200).json({
                    messageEN:`Missing enter ${array[i]} in request`,
                    messageVI: `Bạn chưa nhập ${array[i]}`
                })
            }
        }

        if (newPassword !== reNewPassword) {
            return res.status(200).json({
                messageEN:'Re-entered password is invalid',
                messageVI:'Mật khẩu nhập lại không hợp lệ'
            })
        }

        let response = await useSevice.changePasswordAuthorSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

let changePasswordAcount = async (req, res, next) => {
    try {
        let {email, oldPassword, newPassword, reNewPassword} = req.body

        if (!email || !oldPassword || !newPassword || !reNewPassword) {
            return res.status(200).json({
                messageEN:'Missing infomation in request',
                messageVI: 'Thiếu thông tin truyền lên'
            })
        }

        if (newPassword !== reNewPassword) {
            return res.status(200).json({
                messageEN:'Re-entered password is invalid',
                messageVI:'Mật khẩu nhập lại không hợp lệ'
            })
        }

        let response = await useSevice.changePasswordAccountSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN: 'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let editInforAuthor = async (req, res, next) => {
    try {
        let array = [req.body, req]
        let {name, email, birthDay, gentleId, description} = array[0]

        if (!name || !email || !birthDay || !gentleId || !description) {
            return res.status(200).json({
                messageEN: 'Missing enter information in request',
                messageVI: 'Thiếu thông tin truyền lên'
            })
        }

        let response = await useSevice.editInforAuthorSevice(array)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let editInforAccount = async (req, res, next) => {
    try {
        let array = [req.body, req]
        let { username, phone, email} = array[0]

        if (!username || !phone || !email) {
            return res.status(200).json({
                messageEN:'Missing enter information in request ',
                messageVI:'Thiếu thông tin truyền lên'
            })
        }

        let response = await useSevice.editInforAccountSevice(array)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

module.exports = {
    registerAuthor,
    loginAuthor,
    registerAccount,
    loginAccount, 
    forgotPasswordAuthor,
    forgotPasswordAccount,
    changePasswordAuthor,
    changePasswordAcount,
    editInforAuthor,
    editInforAccount,
}