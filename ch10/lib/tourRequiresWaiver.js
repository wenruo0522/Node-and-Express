module.exports = (req, res, next) => {
    const { cart } = req.session
    if (!cart) {
        return next()
    }
    const requiresWaiver = cart.items.some(item => item.product.requiresWaiver)
    if (requiresWaiver) {
        cart.warnings.push('One or more of your selected tours requires a waiver')
    }
    next()
}