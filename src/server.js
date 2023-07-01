const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
dotenv.config()
const itemsRouter = require('./routes/item')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user');
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
app.use('/order', orderRouter)
app.use('/sign', userRouter)

const PORT = process.env.PORT || 5000

//database connection
dbConnect()

app.listen(PORT, () => {
    try {
        console.log(`Server on ${PORT}`);
    } catch (err) {
        console.log(`Server ${err}`);
    }
})