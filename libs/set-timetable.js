/*
// Usage:
// setTimeout()の引数(関数と、その関数の実行前遅延)をいくつも、不規則にでも投入できる関数

setTimetable(
  1000,
  () => doAnimationPhase1(),
  500,
  () => doAnimationPhase2(),
  () => doAnimationPhase2After(),
  1200,
  () => doAnimationPhase3(),
  300,
  finalDelay, // 条件によって値が変わったり
  () => doAnimationPhaseFinal()
);
*/

const whenNotTypeOf = ((
  defaultValueDefaults = {
    number: 0,
    function: () => {},
  }
) =>
  Object.keys(defaultValueDefaults).reduce(
    (reducing, typeName) => ({
      ...reducing,
      [typeName]: (exam, defaultValue = defaultValueDefaults[typeName]) =>
        // eslint-disable-next-line valid-typeof
        typeof exam === typeName ? exam : defaultValue,
    }),
    {}
  ))();

/* no-async-promise-executor:
If a Promise executor function is using await, this is usually a sign
that it is not actually necessary to use the new Promise constructor,
or the scope of the new Promise constructor can be reduced.
だそうだが、Promise再帰はusuallyに含まれないだろうし、executor関数を
Promiseコンストラクター外に定義するだけで済む回避もせずにルールignore
*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const setTimetable = async (...msOrFunctions) => {
  const recurse = (index = 0) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      if (index >= msOrFunctions.length) {
        resolve();
        return;
      }
      const msOrFunction = msOrFunctions[index];
      const delayMs = whenNotTypeOf.number(msOrFunction, 0);
      const delayedFunction = whenNotTypeOf.function(msOrFunction, () => {});
      await delay(delayMs);
      await delayedFunction();
      await recurse(index + 1);
      resolve();
    });
  await recurse();
};

export default setTimetable;

/* TypeScriptも書けることを明らかにするために、TypeScriptizeしたソースコードも追記
const whenNotTypeOf = ((
  defaultValueDefaults = {
    number: 0,
    function: (...args: any[]) => {},
  }
) => {
  type DefaultValueDefaults = typeof defaultValueDefaults;
  type DefaultValueDefaultKeys = keyof DefaultValueDefaults;
  type WhenNotTypeOf = {
    [K in DefaultValueDefaultKeys]: (
      exam: any,
      defaultValue: DefaultValueDefaults[K]
    ) => DefaultValueDefaults[K];
  };
  type WhenNotTypeOfKeys = keyof WhenNotTypeOf;
  return (Object.keys(defaultValueDefaults) as Array<WhenNotTypeOfKeys>).reduce(
    (reducing: WhenNotTypeOf, typeName) => ({
      ...reducing,
      [typeName]: (exam: any, defaultValue = defaultValueDefaults[typeName]) =>
        // eslint-disable-next-line valid-typeof
        typeof exam === typeName ? exam : defaultValue,
    }),
    {} as WhenNotTypeOf
  );
})();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const setTimetable = async (
  ...msOrFunctions: Array<number | ((...args: any[]) => void)>
) => {
  const recurse = (index = 0) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async (resolve) => {
      if (index >= msOrFunctions.length) {
        resolve();
        return;
      }
      const msOrFunction = msOrFunctions[index];
      const delayMs = whenNotTypeOf.number(msOrFunction, 0);
      const delayedFunction = whenNotTypeOf.function(msOrFunction, () => {});
      await delay(delayMs);
      await delayedFunction();
      await recurse(index + 1);
      resolve();
    });
  await recurse();
};
*/
