const Account = require('../model/account')
const Book = require('../model/book')
const Cart = require('../model/cart')
const Shelve = require('../model/shelve')

let getBook = async (req, res, next) => {
    try {
        let books = await Book.find()

        if (!books) {
            return res.status(200).json({
                messageEN:'Haven not got the data yet',
                messageVI: 'Chưa lấy đc dữ liệu'
            })
        } else {
            return res.status(200).json(books)
        }
    } catch (error) {
        return res.status().json({
            messageEN: 'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let addOneBookSevice = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            let book = new Book(data)
            let check = await book.save()

            if (!check) {
                resolve({
                    messageEN: 'Can not add books',
                    messageVI:'Không thể thêm sách'
                })
            } else {
                resolve({
                    messageEN:'More success',
                    messageVI:'Thêm thành công'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let editOneBookSevice = (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            let { bookName, category, description} = data[0]
            let checkBookId = await Book.findOne({_id: data[1].query.id})

            if (!checkBookId) {
                resolve({
                    messageEN:'This book is not available yet',
                    messageVI:'Chưa có cuốn sách này'
                })
            } else {
                checkBookId.bookName = bookName
                checkBookId.category = category
                checkBookId.description = description
                let check = checkBookId.save()

                if (!check) {
                    resolve({
                        messageEN:'Edit failed',
                        messageVI:'Chỉnh sửa thất bại'
                    })
                } else {
                    resolve ({
                        messageEN:'Edited successfully',
                        messageVI: 'Chỉnh sửa thành công'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteOneBook = async (req, res, next) => {
    try {
        let checkBookId = await Book.delete({_id: req.query.id})
        
        if (!checkBookId) {
            return res.status(200).json({
                messageEN:'The book has not been moved to the trash',
                messageVI:'Sách chưa được chuyển vào thùng rác'
            })
        } else {
            return res.status(200).json({
                messageEN:'The books have been moved to the trash. please check',
                messageVI:'Sách đã được chuyển vào thùng rác. Vui lòng kiểm tra'
            })
        }
    } catch (error) {
        res.status(200).json({
            messageEN:'Missing from to server',
            messageVI:'Có lỗi phía server'
        })
    }
}

let getBooksDeleted = async (req, res, next) => {
    try {
        let booksDeleted = await Book.findWithDeleted({deleted: true})
        
        if (!booksDeleted) {
            return res.status(200).json({
                messageEN: 'Data has not been retrieved',
                messageVI:'Chưa lấy được dữ liệu'
            })
        } else {
            return res.status(200).json(booksDeleted)
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'Missing from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let restoreBook = async (req, res, next) => {
    try {
        let restoreBook = await Book.restore({_id: req.query.id})

        if (!restoreBook) {
            return res.status(200).josn({
                messageEN:'Unable to restore',
                messageVI:'Chưa thể khôi phục'
            })
        } else {
            return res.status(200).json({
                messageEN: 'Restore successfully',
                messageVI:'Khôi phục thành công',
            })
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

let destroyBook = async (req, res, next) => {
    try {
        let destroyBook = await Book.deleteOne({_id: req.query.id})

        if (!destroyBook) {
            return res.status(200).json({
                messageEN:'Temporarily unable to permanently delete',
                messageVI:'Chưa thể xóa vĩnh viễn'
            })
        } else {
            return res.status(200).json({
                messageEN:'This data has been permanently deleted',
                messageVI:'Đã xóa vĩnh viễn dữ liệu này'
            })
        }
    } catch (error) {
        return res.status(200).josn({
            messageEN:'ERROR from to server',
            messageVI: 'Có lỗi từ phía server'
        })
    }
}

let addBookToCart = async (req, res, next) => {
    try {
        let userId = req.query.userId
        let bookId = req.query.bookId
        let user = await Account.findOne({_id : userId}) 
        let book = await Book.findOne({_id: bookId})
        let cart = await Cart.findOne({cartName: user.username})

        if (book.quantity === 0) {
            return res.status(200).json({
                messageEN: 'Books in the library are out of stock',
                messageVI:'Sách trong thư viện đã hết',
            })
        }

        if (cart['bookList'].length === 4) {
            return res.status(200).json({
                messageEN: 'You can only borrow up to 4 books',
                messageVI:'Bạn chỉ được mượn tối đa 4 quyển'
            })
        }

        for (i = 0; i < cart.bookList.length; i++) {
            if (cart.bookList[i]._id.toString() == book._id.toString()) {
                return res.status(200).json({
                    messageEN:'This book is already in the cart',
                    messageVI: 'Sách này đã có trong giỏ hàng'
                })
            }
        }

        cart.bookList.push(book)
        await cart.save()

        for (i = 0; i < book.borrowerIds.length; i++) {
            if (book.borrowerIds[i] === userId) {
                return res.status(200).json({
                    messageEN:'The book has been added to the cart',
                    messageVI:'Sách đã được chuyển vào giỏ hàng'
                })
            }
            if(book.borrowerIds[i] !== userId) {
                book.borrowerIds.push(userId)
                await book.save()

                return res.status(200).json({
                    messageEN:'The book has been added to the cart',
                    messageVI:'Sách đã được chuyển vào giỏ hàng'
                })
            } 
        }
        
    } catch (error) {
        return res.status(200).json({
            messageEN: 'ERROR from to server',
            messageVI:'Có lỗi phía server'
        })
    }
}

let getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({cartName: req.body.cartName})

        if (!cart) {
            return res.status(200).json({
                messageEN:'Cart does not exist',
                messageVI:'Giỏ hàng không tồn tại'
            })
        } else {
            return res.status(200).json(cart)
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

let removeBookFromCart = async (req, res, next) => {
    try {
        let userName = req.query.cartName
        let bookId = req.query.bookId
        let cart = await Cart.findOne({cartName: userName})
        let book = await Book.findOne({_id: bookId})
        let user = await Account.findOne({username: userName})

        for (i = 0; i < book.borrowerIds.length; i++) {
            if (book.borrowerIds[i] !== user._id.toString()) {
                return res.status(200).json({
                    messageEN:'The shopping cart is having an error. Please try again later',
                    messageVI:'Giỏ hàng đang gặp lỗi. Vui lòng thử lại sau'
                })
            } 

            if (book.borrowerIds[i] === user._id.toString()) {
                book.borrowerIds.splice(i)
                await book.save()
                for (i = 0; i < cart.bookList.length; i++) {
                    if (cart.bookList[i]._id.toString() !== bookId) {
                        return res.status(200).json({
                            messageEN:'The book has not been removed from the cart',
                            messageVI:'Sách chưa được chuyển ra khỏi giỏ hàng'
                        })
                    }

                    if (cart.bookList[i]._id.toString() === bookId) {
                        cart.bookList.splice(i)
                        await cart.save()

                        return res.status(200).json({
                            messageEN:'Removed from cart',
                            messageVI:'Đã xóa khỏi giỏ hàng'
                        })
                    }
                }
            }
        }

    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi từ phía server'
        })
    }
}

let booksOnMove = async (req, res, next) => {
    try {
        let cartName = req.query.cartName
        let cart = await Cart.findOne({cartName: cartName})
        let shelve = await Shelve.findOne({shelveName: cartName})

        if (cart.bookList.length === 0) {
            return res.status(200).json({
                messageEN:'There are no books in the cart',
                messageVI:'Chưa có sách trong giỏ hàng'
            })
        }

        if (!cart || !shelve) {
            return res.status(200).json({
                messageEN:'The request to borrow a book is having trouble',
                messageVI:'Yêu cầu mượn sách đang gặp sự cố'
            })
        }

        console.log(cart.bookList[0]._id)

        for (i = 0; i < cart.bookList.length; i++) {
            for (j = 0; j < shelve.bookIds.length; j++) {
                if (cart.bookList[i]._id.toString() === shelve.bookIds[j]._id.toString()) {
                    return res.status(200).json({
                        messageEN:'Some books have been registered to borrow. Please check the bookshelf',
                        messageVI:'Một số sách đã được đăng ký mượn. Vui lòng kiểm tra kệ sách'
                    })
                }
            }
        }

        shelve.bookIds = [...cart.bookList, ...shelve.bookIds]
        cart.bookList = []
        let checkShelve = await shelve.save() 
        let checkCart = await cart.save()
        let check = checkCart && checkShelve

        if (!check) {
            return res.status(200).json({
                messageEN:'Borrowing books has failed',
                messageVI:'Mượn sách thất bại'
            })
        } else {
            return res.status(200).json({
                messageEN:'You have successfully borrowed the book. Please check the bookshelf',
                messageVI:'Bạn đã mượn sách thành công. Vui lòng kiểm tra kệ sách',
            })
        }

    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi phía server'
        })
    }
}

let getShelve = async (req, res, next) => {
    try {
        let shelve = await Shelve.findOne({shelveName: req.query.shelveName})

        if(!shelve) {
            return res.status(200).json({
                messageEN:'Unable to get data',
                messageVI:'Chưa lấy được dữ liệu'
            })
        } else {
            return res.status(200).json(shelve)
        }
    } catch (error) {
        return res.status(200).json({
            messageEN:'ERROR from to server',
            messageVI:'Có lỗi phía server'
        })
    }
}

module.exports = {
    getBook,
    addOneBookSevice,
    editOneBookSevice,
    deleteOneBook,
    getBooksDeleted,
    restoreBook,
    destroyBook,
    addBookToCart,
    getCart,
    removeBookFromCart,
    booksOnMove,
    getShelve,
}
