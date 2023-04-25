/*
// Usage:
// 指定区間の経過時間を計測するためのWindow.performanceを、ある程度簡単に扱えるように
// 動的アクセッサーを発行する関数オブジェクト

const [ outerTimer, innerTimer ] = Timeit('outerTimer', 'innerTimer');
const stopOuter = outerTimer.start();
loopArray.forEach((_, index) => {
  const stopInner = innerTimer.start();
  eachProcessMain();
  const outInner = stopInner();
  console.log(`inner duration[${index}]:`, outInner().duration);
});
const outOuter = stopOuter();
console.log('outer duration:', outOuter().duration);
*/

const decimalDivider = 100;
const createEntry = (name) => {
  let started = false;
  const start = `${name}-start`;
  const stop = `${name}-stop`;
  const getEntries = () => performance.getEntriesByName(name);
  const toSeconds = (ms) =>
    Math.round((ms / 1000) * decimalDivider) / decimalDivider;
  const getRecordProps = (prop) =>
    getEntries().map((entry) => toSeconds(entry[prop]));
  const getDurations = () => getRecordProps('duration');
  const getStartTimes = () => getRecordProps('startTime');
  const getRecords = () =>
    getEntries().map(({ duration, startTime }) => ({
      startTime: toSeconds(startTime),
      duration: toSeconds(duration),
    }));
  const lastOf = (array) => array[array.length - 1];
  const getRecord = (records = getRecords()) =>
    lastOf(records) || {
      duration: null,
      startTime: null,
    };

  const methods = {
    name: () => name,
    start: () => {
      started = true;
      performance.mark(start);
      return methods.stop;
    },
    stop: () => {
      if (!started) return methods.out;
      performance.mark(stop);
      performance.measure(name, start, stop);
      return methods.out;
    },
    out: () => {
      const records = getRecords();
      const record = getRecord(records);

      return {
        duration: record.duration,
        durations: records.map((mapping) => mapping.duration),
        startTime: record.startTime,
        startTimes: records.map((mapping) => mapping.startTime),
        record,
        records,
      };
    },
    results: {
      duration: () => lastOf(getDurations()),
      durations: () => getDurations(),
      startTime: () => lastOf(getStartTimes()),
      startTimes: () => getStartTimes(),
      record: () => getRecord(),
      records: () => getRecords(),
    },
  };
  return methods;
};

export const Timeit = (...camelNames) => {
  const entries = {};
  camelNames.forEach((name) => {
    entries[name] = createEntry(name);
  });
  return entries;
};

export const TimeitUtils = {
  OutDurations:
    (func = (entryName, duration) => console.log(entryName, duration)) =>
    (...entries) => {
      entries.forEach((entry) => func(entry.name(), entry.results.duration()));
    },
};

export default {
  Timeit,
  TimeitUtils,
};
