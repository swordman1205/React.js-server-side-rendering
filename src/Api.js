import fetch from 'isomorphic-fetch';
import viewerStore from './stores/Viewer';

// const URL_PREFIX = 'https://api.nuevas-evas.clevercrew.io/en/api';
export const URL_PREFIX = process.env.BASE_URL || 'https://api.beta.nuevasevas.com/en/api';
//const URL_PREFIX = '//api.nuevas.dev/en/api';

export default function Api(endpoint, options = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    });
  }).then(() => {
    const url = `${URL_PREFIX}${endpoint}`;

    if (viewerStore.token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `${viewerStore.token}`);
      options.headers = myHeaders;
    }

    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    return fetch(url, options)
      .then(response => {
        return response.json().then(json => ({ json, response }));
      })
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
  })
}
