// 階層化なしのフラット構造で
const state = {
  sourceScrollBar: true,
  sourceInput: true,
  resizerLeft: true,
  formattersScrollBar: true,
  formatters: true,
  resizerRight: true,
  resultScrollBar: true,
  resultInput: true,
  usingTestSource: true,
  // 排他されるだけのすべて
  others: true,
};

const stateKeys = Object.keys(state);

export const exclusive = stateKeys.reduce((reducing, stateKey) => {
  Object.defineProperty(reducing, stateKey, {
    get: () => undefined,
    set: (toExclusive) => {
      stateKeys.forEach((settingKey) => {
        const settingValue = toExclusive ? settingKey === stateKey : true;
        state[settingKey] = settingValue;
      });
    },
  });
  return reducing;
}, {});

const setDocumentHtmlCursorStyle = (cursorStyleValue = '') => {
  document.body.parentElement.style.cursor = cursorStyleValue;
};

const forceCursorStyleByEvent = (event) => {
  const cursorStyleValue = window
    .getComputedStyle(event.target)
    .getPropertyValue('cursor');
  setDocumentHtmlCursorStyle(cursorStyleValue);
};

// element.mousedown -> document.mouseup での制御やカーソル維持は使用頻度が多いのでここでケア
const onMouseDown = stateKeys.reduce(
  (reducing, key) => ({
    ...reducing,
    [key]: (mouseDownEvent = null, options = { once: true }) => {
      exclusive[key] = true;
      if (mouseDownEvent) forceCursorStyleByEvent(mouseDownEvent);
      const listener = () => {
        exclusive[key] = false;
        if (mouseDownEvent) setDocumentHtmlCursorStyle();
      };
      document.addEventListener('mouseup', listener, options);
    },
  }),
  {}
);

export const hoverable = state;
export const exclusiveHover = exclusive;
export const mouseDownExclusiveHovers = onMouseDown;
export const mousedownExclusiveHovers = mouseDownExclusiveHovers;
export const setExclusiveCursor = (cursorStyleValue) =>
  setDocumentHtmlCursorStyle(cursorStyleValue);
export const clearExclusiveCursor = () => setDocumentHtmlCursorStyle();

export default {
  hoverable,
  exclusiveHover,
  mouseDownExclusiveHovers,
  mousedownExclusiveHovers,
  setExclusiveCursor,
  clearExclusiveCursor,
};
