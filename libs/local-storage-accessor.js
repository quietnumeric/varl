export const LocalStorageAccessor = (rootKey) => {
  const loadRoot = () =>
    JSON.parse(window.localStorage.getItem(rootKey) || '{}');
  const saveRoot = (rootObj) =>
    window.localStorage.setItem(rootKey, JSON.stringify(rootObj));
  const get = (key) => loadRoot()[key];
  const put = (key, value) => {
    const rootObj = loadRoot();
    rootObj[key] = value;
    saveRoot(rootObj);
  };
  return {
    get,
    put,
    clear: () => window.localStorage.removeItem(rootKey),
  };
};

export default {
  LocalStorageAccessor,
};
