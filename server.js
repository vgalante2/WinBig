require('dotenv').config()
const sequelize = require('./db/client')
const express = require('express')
const routes = require('./routes')
const { engine } = require('express-handlebars')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const store = new SequelizeStore({ db: sequelize })

const app = express()
const PORT = process.env.PORT||3333

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session(
    {
        secret: 'test',
        store,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000000 }
    }
))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/', routes)

sequelize.sync({force: false})
.then(()=>{
    app.listen(PORT,() => {
        console.log('Server running on port: ', PORT)
    })
})