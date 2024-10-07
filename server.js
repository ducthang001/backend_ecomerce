const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log(`Server has closed!`)
  })
})