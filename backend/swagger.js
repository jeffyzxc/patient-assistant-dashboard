import swaggerUi from 'swagger-ui-express'

export const setupSwagger = (app, routesArray = []) => {
  
  if (!routesArray || !routesArray.length) {
    console.warn("No routes passed to Swagger setup!")
    routesArray = []
  }

  let paths = {}
  routesArray.forEach(({ path, route }) => {
    if (!route || !path) return
    routerStackToPaths(route, path, paths)
  })

  const swaggerSpec = {
    openapi: '3.0.0',
    info: { title: 'Patient Assistant API', version: '1.0.0' },
    paths,
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

function routerStackToPaths(router, basePath, paths) {
  router.stack.forEach(layer => {
    if (layer.route) {
      const routePath = basePath + layer.route.path
      const methods = Object.keys(layer.route.methods)
      methods.forEach(method => {
        paths[routePath] = paths[routePath] || {}
        paths[routePath][method] = {
          summary: `Auto-generated ${method.toUpperCase()} ${routePath}`,
          responses: { 200: { description: 'Success' } }
        }
      })
    }
  })
}
