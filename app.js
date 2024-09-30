require('dotenv').config()
const express = require('express')
const connection = require('./db/connect')
const { webRouter,apiRouter } = require('./routes/rts.js')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

// app.get('/',(req,res) => {
//     res.render('login')
// })
app.use('/',webRouter )
app.use('/api',apiRouter )

const port = process.env.PORT || 4000;
const start = async ()=> {
    try {
        await connection(process.env.MONGO_URI)
        console.log("Connected to DB...")
        app.listen(port, console.log("Process running at port "+port))
    } catch (error) {
        console.log(error)
    }
}

start()
