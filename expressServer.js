/* eslint-env node */

import express from 'express';

// Todo: Should really get textbrowser to accept multiple Express middleware
import createBahaiDateApiServer from 'bahai-date-api/createServer.js';
import bahaiReflibDataServer from 'bahai-reflib-data-server/server/index.js';

const expressServer = () => {
  const app = createBahaiDateApiServer();

  const reflibAndDateServer = bahaiReflibDataServer({
    app,
    urlRelativePath: 'bahai-reflib-data-server/'
  });

  const statik = express.static('node_modules/bahai-reflib-data-server/public');
  app.get('/bahai-reflib-data-server/*', (req, res, next) => {
    req.url = req.url.replace('/bahai-reflib-data-server', '');
    statik(req, res, next);
  });

  return reflibAndDateServer;
};

export default expressServer;
