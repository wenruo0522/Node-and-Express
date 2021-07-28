const fortune = require('./fortune')

exports.home = (req, res) => {
    res.render('home')
}

exports.about = (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
}

exports.notFound = (req, res) => {
    res.render('404')
}

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule

exports.serverError = (err, req, res, next) => {
    res.render('500')
}