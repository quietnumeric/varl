import { LocalStorageAccessor } from '~/libs/local-storage-accessor';
import { replacingTestSource } from '~/libs/testing-sources';
import { query } from '~/libs/query';
import { splitSourceToVarValLines } from '~/libs/split-source-to-var-val-lines';
import { formatterDefines } from '~/libs/formatter-defines';
import { formatSourceVarValLines } from '~/libs/format-source-var-val-lines';

const formattersOrderStorage = (() => {
  const localStorage = LocalStorageAccessor('varl');
  const key = 'formatter-labels';
  return {
    save: (labels) => localStorage.put(key, labels),
    load: () => localStorage.get(key),
  };
})();

const privateState = {
  sourceVarValLines: [],
  currentFormatter: null,
  sourceContentUserInputted: '',
};

const doFormat = () =>
  formatSourceVarValLines(
    privateState.sourceVarValLines,
    privateState.currentFormatter
  );

// 性質上、labelがkey代わりに一意
const findFormat = (scanningFormatters, label) =>
  formatterDefines.find((finding) => finding.label === label);

const formattersMerged = (() => {
  const savedLabels = formattersOrderStorage.load();
  if (!savedLabels) return formatterDefines;
  // シャローコピーでいい
  const orderSaved = savedLabels
    .map((label) => {
      const formatter = findFormat(formatterDefines, label);
      if (!formatter) return null;
      formatter.picked = true;
      return formatter;
    })
    .filter((formatter) => formatter);
  const addedSinceLastSaved = formatterDefines.filter(
    (formatter) => !formatter.picked
  );
  return [...orderSaved, ...addedSinceLastSaved];
})();

const multiLineTrim = (multiLineText) =>
  multiLineText
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n');

const inputted = (source) => {
  privateState.sourceVarValLines = splitSourceToVarValLines(source);
  sourceTextArea.content = source;
  if (!privateState.currentFormatter) return;
  resultTextArea.content = doFormat();
};
const blurSource = (event) => {
  const trimmedValue = multiLineTrim(event.target.value);
  inputted(trimmedValue);
};
const inputSource = (event) => {
  inputted(event.target.value);
};

const createTextArea = (
  listeners = {
    input: () => {},
    blur: () => {},
  }
) => ({
  content: '',
  listeners,
});

const sourceTextArea = createTextArea({
  input: inputSource,
  blur: blurSource,
});
const resultTextArea = createTextArea();

export const App = () => {
  const loaded = (event) => {
    inputted(sourceTextArea.content);
  };
  const saveFormattersOrder = () => {
    const labels = formattersMerged.map(
      (formatterOvserbing) => formatterOvserbing.label
    );
    formattersOrderStorage.save(labels);
  };
  const format = (formatter) => {
    privateState.currentFormatter = findFormat(
      formattersMerged,
      formatter.label
    );
    resultTextArea.content = doFormat();
  };
  return {
    main: {
      loaded,
    },
    source: sourceTextArea,
    result: resultTextArea,
    format: {
      list: {
        substance: formattersMerged,
        methods: {
          saveFormattersOrder,
        },
      },
      item: {
        methods: {
          format,
        },
      },
    },
  };
};

export const UsingTestSourceToggle = () => {
  const queryKey = 'using-test-source';
  const publicState = {
    checked: false,
  };
  const backupSouceContentUserInputted = () => {
    privateState.sourceContentUserInputted = sourceTextArea.content;
  };

  const changeChecked = (event) => {
    const { checked } = event.target;
    publicState.checked = checked;
    if (checked) backupSouceContentUserInputted();
    const source = checked
      ? replacingTestSource
      : privateState.sourceContentUserInputted;
    inputted(source);
    query.put(queryKey, checked);
  };
  const loaded = () => {
    if (query.get(queryKey) !== 'true') return;
    publicState.checked = true;
    backupSouceContentUserInputted();
    inputted(replacingTestSource);
  };
  return {
    state: publicState,
    loaded: () => loaded(),
    listeners: {
      change: (event) => changeChecked(event),
    },
  };
};

export default {
  App,
  UsingTestSourceToggle,
};
