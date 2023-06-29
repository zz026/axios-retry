var express = require('express')
var router = express.Router()

router.get('/success', (req, res) => {
    console.log('query', req.query)
    res.send({
        code: 0,
        message: 'success'
    })
})


router.put('/error', (req, res) => {
    console.log('data', req.body)
    res.status(500).send('http 500')
})

router.post('/retrypost', (req, res) => {
    const flag = Math.floor(Math.random() * 10)
    console.log('flag', flag, req.body)
    if (flag < 5) {
        setTimeout(() => {
            res.send({
                code: 0,
                message: 'retry success ' + flag
            })
        }, 1000 * 60)
    } else {
        res.send({
            code: 0,
            message: 'retry success ' + flag
        })
    }
})


module.exports = router