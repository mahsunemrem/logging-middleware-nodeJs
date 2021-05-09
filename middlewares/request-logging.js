const Logger = require('../helper/logging/logger')

const requestLogging = async (req, res,next) => {
    const { rawHeaders, httpVersion, method, socket, url, body } = req;
    const { remoteAddress, remoteFamily } = socket;
    
    req.requestStart = Date.now();
    console.log('req log çalıştı')
    const requestLog = {
      rawHeaders,
      body : JSON.stringify(body),
      httpVersion,
      method,
      remoteAddress,
      remoteFamily,
      url
    };
  
    Logger.request('Request Logging', {requestLog: requestLog})

    next()
}

module.exports = requestLogging