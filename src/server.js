const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const itemsRouter = require('./routes/item')
const dbConnect = require('./database/connection')
const app = express()


app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.json({'Status': 'OK'})
})

//routes
app.use('/item',itemsRouter)

const PORT = 5000

dbConnect()

app.listen(PORT, () => {
    try {
        console.log(`Server on ${PORT}`);
    } catch (err) {
        console.log(`Server ${err}`);
    }
})