const express = require('express')
const bodyParser = require('body-parser')

const testRouter = require('./test')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/test', testRouter)


app.get('/', (req, res) => {
    res.send('Hello Express')
})


app.listen(3000, () => {
    console.log('express running!')
})