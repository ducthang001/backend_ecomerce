'use strict'

const dev = {
  app: {
    port: process.env.DEV_PORT_APP || 4000
  },
  db: {
    host: process.env.DEV_HOST_DB || 'localhost',
    port: process.env.DEV_PORT_DB || 27017,
    name: process.env.DEV_NAME_DB || 'testDBdev'
  }
}

const pro = {
  app: {
    port: process.env.PRO_PORT_APP || 4000,
  },
  db: {
    host: process.env.PRO_HOST_DB || "localhost",
    port: process.env.PRO_PORT_DB || 27017,
    name: process.env.PRO_NAME_DB || "testDBpro",
  },
};

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]