const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp} = format;
require('winston-mongodb')

const levels = {
  error:0,
  info:1,
  req:2
}

const infoFile= {path : './logs/info.log', level: 'info'}
const requestFile = {path : './logs/req.log', level: 'req'}

const getFile = (fileInfo) => {
  return new transports.File({ 
    filename: fileInfo.path, 
    level: fileInfo.level,
    maxsize: 20000,
  })
}

const mongoDb = () => {
  return new transports.MongoDB({
    db: process.env.MONGO_URI,
    collection:'logs',
    capped:true,
    metaKey:'meta'
  })
}

const  logger = createLogger({
  levels: levels,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json()
  ),
  defaultMeta: { project: process.env.PROJECT },
  transports: [
    new transports.File({ 
      filename: './logs/info.log', 
      level: 'info',
      maxsize: 20000,
    })
  ],
}); 
  
const error =  (message,obj) => {
  logger.clear().add(mongoDb());
  logger.error(message,obj);
}

const  info =   (message) => {
  logger.clear().add(getFile(infoFile));
logger.info(message)
}

const request =  (message,obj) => {
  logger.clear().add(getFile(requestFile));
  logger.req(message,obj)
}

module.exports =  {error, info, request}