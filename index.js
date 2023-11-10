const express = require('express')
const morgan = require('morgan')
const db = require('./src/config/index')
const rootRouter = require('./src/routers/web')
const app = express()
const port = 3000

db.connect()

app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

app.use('/api', rootRouter)

app.use(morgan('combined'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})