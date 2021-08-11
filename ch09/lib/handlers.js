const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

class NewsletterSignup {
    constructor({ name, email }) {
        this.name = name
        this.email = email
    }

    async save() {
        // ToDO
    }
}

exports.home = (req, res) => res.render('home')

exports.newsletterSignup = (req, res) => {
    // we will learn about CSRF later...for now, we just provide a dummy value
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    // input validation
    if (!VALID_EMAIL_REGEX.test(email)) {
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error',
            message: 'The email address you entered was not valid.'
        }
        return res.redirect(303, '/newsletter-signup')
    }

    new NewsletterSignup({ name, email }).save().then(() => {
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.'
        }
        return res.redirect(303, '/newsletter-archive')
    }).catch(err => {
        req.session.flash = {
            type: 'danger',
            intro: 'Database error!',
            message: 'There was a database error; please try again later.'
        }
        return res.redirect(303, '/newsletter-archive')
    })
}
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
exports.newsletterArchive = (req, res) => res.render('newsletter-archive')

exports.notFound = (req, res) => res.render('404')

exports.serverError = (req, res) => res.render('500')





