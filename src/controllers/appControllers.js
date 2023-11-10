const appSevice = require('../sevices/appSevice')

let addOneBook = async (req, res, next) => {
    try {
        let {bookName, description, quantity, category} = req.body
        
        if (!bookName || !description || !quantity || !category) {
            return res.status(200).json({
                messageEN:'Missing enter information in request',
                messageVI:'Thiếu thông tin truyền lên'
            })
        }

        let response = await appSevice.addOneBookSevice(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Lỗi từ phía server'
        })
    }
}

let editOneBook = async (req, res, next) => {
    try {
        let array = [req.body, req]
        let {bookName, category, description} = array[0]
        
        if (!bookName || !category || !description) {
            return res.status(200).json({
                messageEN:'Missing enter information in request',
                messageVI:'Thiếu thông tin truyền lên'
            })
        }
        let response = await appSevice.editOneBookSevice(array)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi phía server'
        })
    }
}


module.exports = {
    addOneBook,
    editOneBook,
}