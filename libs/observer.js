/*
// Usage:
// Object.defineProperty()を利用して、リアクティブプログラミングフレームワークの根幹を成す
// リアクティブな振る舞いをネイティブ DOM で実現するチェイン関数

const state = {
  valuePropA: 'foo',
  valuePropB: 'bar',
};

const observingState = Observer(state)
  .bind('valuePropA', (value) => console.log(`Aに${value}が代入された`))
  .bind('valuePropB', (value) => console.log(`Bに${value}が代入された`));

observingState.valuePropA = 'aaa'; // console: Aにaaaが代入された
observingState.valuePropB = 'bbb'; // console: Bにbbbが代入された
*/

export const Observer = (entity) => {
  const bind = (key, maySet, mayGet) => {
    const accessors =
      typeof maySet === 'object'
        ? {
            set: maySet.set || (() => {}),
            get: maySet.get || ((currentValue) => currentValue),
          }
        : {
            set: maySet,
            get: mayGet || ((currentValue) => currentValue),
          };

    const entityKey = `_${key}`;
    entity[entityKey] = entity[key];
    accessors.set(entity[key]);
    Object.defineProperty(entity, key, {
      get: () => accessors.get(entity[entityKey]),
      set: (newValue) => {
        if (entity[entityKey] === newValue) return;
        entity[entityKey] = newValue;
        accessors.set(newValue);
      },
    });
    return { bind };
  };
  return { bind };
};

const observedKeys = (entity) =>
  Object.keys(entity).filter((key) => !key.startsWith('_'));

export const Observed = {
  keys: (entity) => observedKeys(entity),
  values: (entity) => observedKeys(entity).map((key) => entity[key]),
};

export default {
  Observer,
  Observed,
};
