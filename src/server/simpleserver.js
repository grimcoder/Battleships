const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.listen(3000, "192.241.216.51")