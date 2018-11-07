const urlBase = 'http://www.dnd5eapi.co/api/';

export const get = urlObj => {
  return new Promise((resolve, reject) => {
    fetch(buildUrl(urlObj)).then(res => {
      res.json().then(res => {
        resolve(res);
      }, handleApiError);
    }, handleApiError);
  });
};

export const getWithUrl = url => {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      res.json().then(res => {
        resolve(res);
      }, handleApiError);
    }, handleApiError);
  });
};

const buildUrl = urlObj => {
  const { section, index, name } = urlObj;
  let url = urlBase + section + '/';
  if (name) {
    url = url + '?name=' + name;
  } else if (index) {
    url = url + index;
  }
  return url;
};

const handleApiError = () => {
  console.log('Api call failed');
};

export default {
  get: get,
  getWithUrl: getWithUrl
};
