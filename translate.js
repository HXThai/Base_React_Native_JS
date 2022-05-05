const chokidar = require('chokidar');
const fs = require('fs');
const translate = require('@vitalets/google-translate-api');
let flatten = require('flat');
let {unflatten} = require('flat');
let basePath = './src/utils/Language/Locales/';
let vi = `${basePath}vi.js`;
let cache = {
  en: {},
  vi: {},
  ja: {},
};
let tranFrom = 'en';
let tranFromPath = `${basePath}${tranFrom}.js`;
let tranTo = ['vi', 'ja'];
let tranText = (key, text, from, to) => {
  return new Promise((resolve, reject) => {
    if (cache?.[to]?.[text]) {
      resolve([key, cache[to][text]]);
    } else {
      translate(text, {from, to})
        .then(res => {
          if (!cache[to]) cache[to] = {};
          if (!cache[to][text]) cache[to][text] = res.text;
          console.log('tran', text, res.text);
          resolve([key, res.text]);
        })
        .catch(err => {
          console.error(err);
          resolve([key, text]);
          // reject(err);
        });
    }
  });
};

let mainHandle = async (to = 'en') => {
  try {
    let source = require('./src/utils/Language/locales/en.js');
    // console.log(source);
    let fl = flatten(source);
    let ar = Object.entries(fl);
    let re = await Promise.all(ar.map(_ => tranText(_[0], _[1], 'en', to)));
    let result = {};

    re.map(_ => {
      let key = _[0];
      let val = _[1];
      result[key] = val;
    });
    result = unflatten(result);
    result = JSON.stringify(result, null, 2);
    let form = `let ${to} = ${result} \n\nmodule.exports = ${to};`;
    form = form.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
      return match.replace(/"/g, '');
    });
    fs.writeFileSync(`${basePath}${to}.js`, form);
    console.log(`update tran to ${to} ok!`);
  } catch (e) {
    console.log(e);
  }
};

chokidar
  .watch(tranFromPath, {
    persistent: true,
  })
  .on('change', async path => {
    delete require.cache[
      require.resolve(`./src/utils/Language/locales/${tranFrom}.js`)
    ];
    tranTo.forEach(e => {
      mainHandle(e);
    });
  })
  .on('ready', () => {
    console.log('Ready');
    tranTo.forEach(e => {
      mainHandle(e);
    });
  });
