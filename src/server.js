import express from 'express';
import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MetaTagsServer from 'react-meta-tags/server';
import { MetaTagsContext } from 'react-meta-tags';

import App from './App';

// Stores
import viewerStore from './stores/Viewer';
import authStore from './stores/Auth';
import userStore from './stores/User';
import themeStore from './stores/Theme';
import blogStore from './stores/Blog';
import programStore from './stores/Program';
import contactsStore from './stores/Contacts';
import directoriesStore from './stores/Directories';
import paymentStore from './stores/Payment';
import discussionStore from './stores/Discussion';
import threadStore from './stores/Thread';
import socialStore from './stores/Social';

import { dynamicPages } from './dynamic-pages';

const getPage = (url) => {
  for (const page of dynamicPages) {
    const matches = url.match(page.regex);
    if (matches && matches[0] === url) {
      return page;
    }
  }
  return null;
}

const stores = {
  viewerStore,
  authStore,
  userStore,
  themeStore,
  blogStore,
  programStore,
  contactsStore,
  directoriesStore,
  paymentStore,
  discussionStore,
  threadStore,
  socialStore
};

const app = express();
const PORT = process.env.PORT || 3000;
const metaTagsInstance = MetaTagsServer();

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.static(path.resolve(__dirname, "../static")));

app.get("/*", (req, res) => {
  const jsx = (
    <Provider {...stores}>
      <MetaTagsContext extract = {metaTagsInstance.extract}>
        <StaticRouter location={req.url}>
          <App/>
        </StaticRouter>
      </MetaTagsContext>
    </Provider>
  );
  const reactDom = renderToString(jsx);
  const meta = metaTagsInstance.renderToString().trim();
  const page = getPage(req.url);
  if (page && !(page.name === 'theme' && meta.indexOf('{{theme}}') === -1) && !(page.name === 'sub-theme' && meta.indexOf('{{theme}}') === -1)) {
    const defaultMeta = `
      <title>Nuevas Evas</title>
      <meta name="description" content="Nuevas Evas"/>
    `;
    page.getMetaData(req.url).then(resp => {
      sendHtml(reactDom, resp, res);
    }).catch(() => {
      sendHtml(reactDom, defaultMeta, res);
    });
  } else {
    sendHtml(reactDom, meta, res);
  }
});

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://0.0.0.0:${PORT}`);
});

const sendHtml = (reactDom, meta, res) => {
  const indexFile = path.resolve('./index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Oops, something is wrong');
    }
    return res.send(data.replace('<div id="app"></div>', `<div id="app">${reactDom}</div>`).replace('{{metaTags}}', meta));
  })
}
