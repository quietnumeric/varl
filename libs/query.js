// URLのパラメータを取得
const search = window.location.search.substring(1);
const json = {};

if (search) {
  search.split('&').forEach((keyValueStr) => {
    const [key, value] = keyValueStr.split('=');
    json[key] = value;
  });
}

// 一旦パスは埋め込みで
const replaceState = (str) => {
  // ページライフサイクルで history.state を持ちまわるライブラリーもあるので
  // 毎回引き継ぎ
  const nextState = {};
  // history.stateはObject.keys()でkeys取れない
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in window.history.state) {
    nextState[key] = window.history.state[key];
  }
  window.history.replaceState(nextState, '', str ? `?${str}` : '');
};

const toSearch = () =>
  replaceState(
    Object.keys(json)
      .map((key) => `${key}=${json[key]}`)
      .join('&')
  );

const put = (key, value) => {
  json[key] = value;
  toSearch();
};

const remove = (key) => {
  delete json[key];
  toSearch();
};

const get = (key) => json[key];

export const query = {
  put,
  get,
  remove,
};

export default {
  query,
};
