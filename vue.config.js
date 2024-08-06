const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// const fs = require('fs')
// module.exports = {
//   devServer: {
//     https: {
//       key: fs.readFileSync('./localhost-key.pem'),
//       cert: fs.readFileSync('./localhost.pem'),
//     },
//   },
// }