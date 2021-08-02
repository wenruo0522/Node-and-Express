const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const catNames = require('cat-names')
const app = express()

// the following is needed to use views
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// the following is needed for cookie support
app.use(cookieParser())

// the following is needed for session support
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }))

// see the views/greeting.hbs file for the contents of this view
app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username
    })
})


