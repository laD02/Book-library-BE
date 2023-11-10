const jwt = require('jsonwebtoken')

let verifyToken = ( req, res, next) => {
    
    try {
        let account = req.header('Authorization')
        let token = account && account.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                messageEN:'Token not found',
                messageVI: 'Không tìm thấy token'
            })
        } else {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.userId = decoded.userId
            req.roleId = decoded.roleId
            next()
        }
        
    } catch (error) {
        return res.status(403).json({
            messageEN: 'invalid token',
            messageVI:'Token không hợp lệ'
        })
    }
}

module.exports = {
    verifyToken,
}