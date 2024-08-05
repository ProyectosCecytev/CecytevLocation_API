const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de la documentación
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST",
      version: "1.0.0",
      description: "Documentación de la API REST para el login"
    },
  },
  apis: ["../src/router/login.route.js"], // Especifica la ruta al archivo de rutas
};

// Generar la documentación de los endpoints
const specs = swagger(options);

// Función para mostrar la documentación de los endpoints
const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`La documentación de los endpoints usados está en http://localhost:${port}/api-docs`);
}

module.exports = { swaggerDocs };