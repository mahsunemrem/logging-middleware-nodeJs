const Logger = require('../helper/logging/logger')

const error = (err, req, res, next) => {
    Logger.error(JSON.stringify(err.stack))
    res.send('error!!')
}

module.exports = error