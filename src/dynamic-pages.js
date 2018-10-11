const request = require('request-promise');

import { URL_PREFIX } from './Api';

export const dynamicPages = [
  {
    name: 'blog-post',
    regex: /\/blog\/([0-9]+)([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const postURL = slugList[slugList.length - 1];
      let post_slug;
      if (postURL) {
        if (postURL.indexOf("-") !== -1){
          post_slug = postURL.substring(1 + postURL.indexOf("-"));
        } else {
          post_slug = "";
        }
      }
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/get-blog-post`,
        body: { post_slug },
        json: true
      }).then(res => (
        `
          <title>${res.title} - Nuevas Evas</title>
          <meta name="description" content="${res.meta_description}"/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'blog-theme',
    regex: /\/blog\/([-_0-9a-zA-Z]+)((\/([-_0-9a-zA-Z]+)){0,1})/,
    getMetaData: (url) => {
      let theme_slug;
      let page = 1;
      const slugList = url.split('/');
      const categoryBuf = slugList[2];
      if (url.indexOf("_") != -1) {
        page = url.substring(1 + url.indexOf("_"));
      }
      if(categoryBuf.indexOf("_") != -1) {
        theme_slug = categoryBuf.substring(0, categoryBuf.indexOf("_"));
      } else {
        theme_slug = categoryBuf;
      }
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/theme`,
        body: { theme_slug },
        json: true
      }).then(res => (
        `
          <title>Blog de ${res.name} tratamientos y remedios naturales ${page > 1 ? `Pagina ${page} ` : ''}- Nuevas Evas</title>
          <meta name="description" content="${res.meta_description ? `${res.meta_description.replace(/(<([^>]+)>)/g, "")} ` : ''}Pagina numero ${page} ${theme_slug}."/>
        `
      )).catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-category',
    regex: /\/directorio\/local\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const country_slug = slugList[slugList.length - 3];
      const city_slug = slugList[slugList.length - 2];
      const category_slug = slugList[slugList.length - 1];
      return Promise.all([
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/country`,
          body: { country_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/city`,
          body: { city_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/category`,
          body: { category_slug },
          json: true
        })
      ])
      .then(res => (
        `
          <title>${res[2].title}, ${res[1].name}, ${res[0].name} - Directorio Saludable - Nuevas Evas</title>
          <meta name="description" content="En el directorio saludable de ${res[1].name}, ${res[0].name} de Nuevas Evas puedes encontrar ${res[2].title} que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos."/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-category-online',
    regex: /\/directorio\/online\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const category_slug = slugList[slugList.length - 1];
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/category`,
        body: { category_slug },
        json: true
      }).then(res => (
        `
          <title>${res.title} - Directorio Saludable - Nuevas Evas</title>
          <meta name="description" content="En el directorio saludable online de Nuevas Evas puedes encontrar ${res.title} que ofrecen productos que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos."/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-country',
    regex: /\/directorio\/local\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const country_slug = slugList[slugList.length - 1];
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/country`,
        body: { country_slug },
        json: true
      }).then(res => (
        `
          <title>${res.name} tratamientos y remedios naturales  - Nuevas Evas</title>
          <meta name="description" content="En el directorio saludable de ${res.name} de Nuevas Evas puedes encontrar restaurantes, tiendas, ferias, hoteles, y centros que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos y ecológicos, amigables con vegetarianos y veganos."/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-single',
    regex: /\/directorio\/local\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const country_slug = slugList[slugList.length - 2];
      const city_slug = slugList[slugList.length - 1];
      return Promise.all([
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/country`,
          body: { country_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/city`,
          body: { city_slug },
          json: true
        })
      ]).then(res => (
        `
          <title>${res[1].name}, ${res[0].name} - Directorio Saludable - Nuevas Evas</title>
          <meta name="description" content="En el directorio saludable de ${res[1].name}, ${res[0].name} de Nuevas Evas puedes encontrar restaurantes, tiendas, ferias, hoteles, y centros que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos."/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-post',
    regex: /\/directorio\/local\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const country_slug = slugList[slugList.length - 4];
      const city_slug = slugList[slugList.length - 3];
      const category_slug = slugList[slugList.length - 2];
      let business_slug;
      const businessURL = slugList[slugList.length - 1];
      if (businessURL!=undefined) {
        if (businessURL.indexOf("-") !== -1){
          business_slug = businessURL.substring(1 + businessURL.indexOf("-"));
        } else {
          business_slug = "";
        }
      }
      return Promise.all([
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/country`,
          body: { country_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/city`,
          body: { city_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/category`,
          body: { category_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/get-business`,
          body: { business_slug },
          json: true
        })
      ])
      .then(res => {
        return `
          <title>${res[3].title}, ${res[2].title}, ${res[1].name}, ${res[0].name} - Nuevas Evas</title>
          <meta name="description" content="${res[3].meta_description || 'Nuevas Evas'}"/>
        `
      })
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'directory-post-online',
    regex: /\/directorio\/online\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const category_slug = slugList[slugList.length - 2];
      let business_slug;
      const businessURL = slugList[slugList.length - 1];
      if (businessURL!=undefined) {
        if (businessURL.indexOf("-") !== -1){
          business_slug = businessURL.substring(1 + businessURL.indexOf("-"));
        } else {
          business_slug = "";
        }
      }
      return Promise.all([
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/category`,
          body: { category_slug },
          json: true
        }),
        request({
          method: 'POST',
          uri: `${URL_PREFIX}/get-business`,
          body: { business_slug },
          json: true
        })
      ]).then(res => (
        `
          <title>${res[1].title}, ${res[0].title} - Nuevas Evas</title>
          <meta name="description" content="${res[1].meta_description || 'Nuevas Evas'}"/>
        `
      ))
      .catch(err => Promise.reject(err));
    }
  },
  {
    name: 'thread',
    regex: /\/comunidad\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      const slugList = url.split('/');
      const slug = slugList[slugList.length - 1];
      let page = 1;
      let thread_slug = "";
      let idThread = 0;
      if(slug!=undefined){
        if (slug.indexOf("-") == -1) {
          thread_slug = "";
        } else {
          if (slug.indexOf("_") == -1){
            thread_slug = slug.substring(1+slug.indexOf("-"));
          } else {
            thread_slug = slug.substring(1+slug.indexOf("-"), slug.indexOf("_"));
            page = slug.substring(1+slug.indexOf("_"));
          }
        }
      } else {
        thread_slug =  "";
      }

      if (slug.indexOf("-") == -1){
        idThread = 0;
      } else {
        idThread = slug.substring(0, slug.indexOf("-"));
      }

      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/get-thread`,
        body: { thread_slug, offset: page, rec_limit: 5 },
        json: true
      }).then(res => (
        `
          <title>${page > 1 ? `Página ${page} ` : ''}${res.title}, comunidad - Nuevas Evas</title>
          <meta name="description" content="${page > 1 ? `Página ${page}, ` : ''}${res.title}. Nuevas Evas es una comunidad para aprender cómo tratar y curar ${res.theme ? res.theme.title : '' } utilizando tratamientos y medicina natural."/>
        `
      )).catch(err => Promise.reject(err));
    }
  },
  {
    name: 'theme',
    regex: /\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      let theme_slug = "";
      const slugList = url.split('/');
      const slug = slugList[slugList.length - 1];
      if(slug!=undefined){
        if (slug.indexOf("_") == -1){
          theme_slug = slug;
        } else {
          theme_slug = slug.substring(0, slug.indexOf("_"));
        }
      }
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/theme`,
        body: { theme_slug },
        json: true
      }).then(res => (
        `
          <title>${res.name}, tratamientos y remedios naturales - Nuevas Evas</title>
          <meta name="description" content="${res.meta_description ? res.meta_description.replace(/(<([^>]+)>)/g, "") : ''}"/>
        `
      )).catch(err => Promise.reject(err));
    }
  },
  {
    name: 'sub-theme',
    regex: /\/([-_0-9a-zA-Z]+)\/([-_0-9a-zA-Z]+)/,
    getMetaData: (url) => {
      let subtheme_slug = "";
      const slugList = url.split('/');
      const subSlug = slugList[slugList.length - 1];
      let page = 1;
      if (subSlug.indexOf("_") == -1){
        subtheme_slug = subSlug;
      } else {
        subtheme_slug =  subSlug.substring(0, subSlug.indexOf("_"));
        page = subSlug.substring(1 + subSlug.indexOf("_"));
      }
      return request({
        method: 'POST',
        uri: `${URL_PREFIX}/foro-subtheme`,
        body: { subtheme_slug },
        json: true
      }).then(res => (
        `
          <title>${page > 1 ? `Página ${page} ` : ''}${res.name} y alimentación-saludable, tratamientos y medicina natural - Nuevas Evas</title>
          <meta name="description" content="${page > 1 ? `Página ${page}, ` : ''}${res.name} y alimentación-saludable. Nuevas Evas es una comunidad donde aprendes cómo cuidar tu salud utilizando los alimentos como medicina natural, recibe el apoyo de especialistas de nutrición. Comparte consejos de salud con otras mujeres."/>
        `
      )).catch(err => Promise.reject(err));
    }
  }
]
