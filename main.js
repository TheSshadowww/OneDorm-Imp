const express = require('express')
const app = express()
const port = 3000

app.get('/tezk', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})