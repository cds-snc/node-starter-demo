const path = require('path')
const {
  validateRouteData,
  getSessionData,
  getRouteByName,
  addViewPath,
  setFlashMessageContent,
} = require('../../utils/index')

module.exports = app => {
  const name = 'confirmation'
  const route = getRouteByName(name)

  addViewPath(app, path.join(__dirname, './'))

  app.get(route.path, async (req, res) => {
    
    res.render(name, { data: getSessionData(req) })
  })
}
