require('dotenv').config()
const express = require('express')
const connection = require('./db/connect')
const { webRouter,apiRouter } = require('./routes/rts.js')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.disable('x-powered-by');
app.use((req,res,next) => {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options','nosniff')
    next()
})

app.use('/api',apiRouter )
app.use('/',webRouter )

const port = process.env.PORT || 4000;
const start = async ()=> {
    try {
        await connection(process.env.MONGO_URI)
        console.log("Connected to DB...")
        app.listen(port,'0.0.0.0', console.log("Process running at port "+port))
    } catch (error) {
        console.log(error)
    }
}

start()
