const jwt = require('jsonwebtoken')
const authenticator = (req, res, next) => {
    // console.log(req.headers)
    if (!req.headers.authentication) {
        res.status(401).json({ msg: 'Unauthorized' })
        return
    }
    const c = req.headers.authentication.split(' ')
    // console.log(c)
    const [a, b] = c
    if(a.trim() != 'Bearer')
        res.status(401).json({ msg: 'Unauthorized' })
    jwt.verify(b, process.env.JWT_SECRET, (err, d) => {
        if (err) {
            console.log(err)
            res.status(401).json({ msg: 'Unauthorized' })
        }
        else {
            console.log("authenticated")
            res.locals.decrypt = d
            next()
        }
    })
}


module.exports = {
    authenticator
}