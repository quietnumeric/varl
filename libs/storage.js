import { LocalStorageAccessor } from '~/libs/local-storage-accessor';

const localStorage = LocalStorageAccessor('varl');

// 複数タブは考慮しない(今ユーザーが見ているタブの内容で上書き)
export const formattersOrderStorage = (() => {
  const key = 'formatter-labels';
  return {
    save: (labels) => localStorage.put(key, labels),
    load: () => localStorage.get(key),
  };
})();

export default {
  formattersOrderStorage,
};
