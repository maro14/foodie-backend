const express = require('express')
const morgan = require('morgan');

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.json({'Status': 'OK'})
})

const PORT = 5000

app.listen(PORT, () => {
    try {
        console.log(`Server on ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})