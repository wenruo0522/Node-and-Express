module.exports = {

    resetValidation(req, res, next) {
        const { cart } = req.session
        if (cart) {
            cart.warnings = []
            cart.errors = []
        }
        next()
    },

    checkWaivers(req, res, next) {
        const { cart } = req.session
        if (!cart) {
            return next()
        }
        const requiresWaiver = cart.items.some(item => item.product.requiresWaiver)
        if (requiresWaiver) {
            cart.warnings.push('One or more of your selected tours requires a waiver')
        }
        next()
    },

    checkGuestCounts(req, res, next) {
        const { cart } = req.session
        if (!cart) {
            return next()
        }
        const guest = cart.items.some(item => item.guests > item.product.maxGuests)
        if (guest) {
            cart.errors.push(`One or more of your selected tours cannot accommodate the number of guests you have selected.`)
        }
        next()
    }
}