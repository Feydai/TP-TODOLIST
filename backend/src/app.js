const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const openapi = require('./docs/openapi');

const app = express();

app.use(express.json());
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(openapi, {
		customCss: '.download-url-wrapper, .copy-to-clipboard { display: none !important; }',
	}),
);
app.use('/api', routes);

module.exports = app;