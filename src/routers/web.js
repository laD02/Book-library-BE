const express = require('express')
const useControllers = require('../controllers/useControllers')
const useSevice = require('../sevices/useSevice')
const appControllers = require('../controllers/appControllers')
const appSevice = require('../sevices/appSevice')
const router = express.Router()

router.post('/author/register', useControllers.registerAuthor)
router.post('/author/login', useControllers.loginAuthor)
router.post('/author/forgot/password', useControllers.forgotPasswordAuthor)
router.get('/author', useSevice.getInfoAuthor)
router.post('/author/change/password', useControllers.changePasswordAuthor)
router.put('/author/edit/information', useControllers.editInforAuthor)

router.post('/addOneBook', appControllers.addOneBook)
router.put('/editOneBook', appControllers.editOneBook)
router.delete('/deleteOneBook', appSevice.deleteOneBook)
router.get('/getBooks', appSevice.getBook)
router.get('/getBooksDeleted', appSevice.getBooksDeleted)
router.put('/restoreBook', appSevice.restoreBook)
router.delete('/destroyBook', appSevice.destroyBook)

router.post('/account/register', useControllers.registerAccount)
router.post('/account/login', useControllers.loginAccount)
router.post('/account/forgot/password', useControllers.forgotPasswordAccount)
router.get('/account', useSevice.getInfoAccount)
router.post('/account/change/password', useControllers.changePasswordAcount)
router.put('/account/edit/information', useControllers.editInforAccount)

router.put('/addBookToCart', appSevice.addBookToCart)
router.get('/cart', appSevice.getCart)
router.put('/removeBookFromCart', appSevice.removeBookFromCart)
router.put('/booksOnMove', appSevice.booksOnMove)
router.get('/getShelve', appSevice.getShelve)

module.exports = router

