const [vertical, horizontal] = ['vertical', 'horizontal'];

const mousePagePositionKeys = {
  [vertical]: 'pageX',
  [horizontal]: 'pageY',
};

export const Resizeus = (() => {
  const DirectionCore = (directionKey, positionInit = 0) => {
    const privateState = {
      mouseDownedPosition: 0,
      positionPre: 0,
    };
    const privateFunctions = {
      rangeGetter: () => ({ min: 0, max: null }),
      onMouseMove: (position, positionMoved) => {},
      onMouseDown: (position, positionMoved) => {},
      onMouseUp: (position, positionMoved) => {},
    };
    const publicState = {
      position: positionInit,
      event: {
        active: false,
      },
    };

    const mousePagePositionKey = mousePagePositionKeys[directionKey];

    const publicStateEvent = publicState.event;

    const calcMovedPosition = () =>
      publicState.position - publicState.positionPre;
    const toOnMouseReturnArgs = () => [
      publicState.position,
      calcMovedPosition(),
    ];

    // mousemove と mouseup をdocumentレベルでやる以上、Promisifyはできない
    const mouseDown = (mouseDownEvent) => {
      mouseDownEvent.stopPropagation();

      privateState.mouseDownedPosition = mouseDownEvent[mousePagePositionKey];
      privateState.positionPre = publicState.position;
      publicStateEvent.active = true;
      const { min, max } = privateFunctions.rangeGetter();

      const mouseMoveEventListener = (mouseMoveEvent) => {
        const movedPosition =
          mouseMoveEvent[mousePagePositionKey] -
          privateState.mouseDownedPosition;
        const actualPosition = privateState.positionPre + movedPosition;
        const newPosition = (() => {
          if (min !== null && actualPosition < min) return min;
          if (max !== null && actualPosition > max) return max;
          return actualPosition;
        })();
        publicState.position = newPosition;
        privateFunctions.onMouseMove(...toOnMouseReturnArgs());
      };

      const mouseUpEventListener = () => {
        document.removeEventListener('mousemove', mouseMoveEventListener);
        document.removeEventListener('mouseup', mouseUpEventListener);
        publicStateEvent.active = false;
        privateFunctions.onMouseUp(...toOnMouseReturnArgs());
      };
      document.addEventListener('mousemove', mouseMoveEventListener);
      document.addEventListener('mouseup', mouseUpEventListener);
      privateFunctions.onMouseDown(...toOnMouseReturnArgs());
    };

    const setPosition = (position) => {
      publicState.position = position;
    };

    const loaded = (position) => {
      setPosition(position);
    };

    return {
      state: publicState,
      listeners: {
        mousedown: (event) => mouseDown(event),
      },
      setters: {
        position: (position = 0) => setPosition(position),
        rangeGetter: (rangeGetter = () => ({ min: 0, max: null })) => {
          privateFunctions.rangeGetter = rangeGetter;
        },
      },
      on: {
        mousedown: (onMouseDown = (position, positionMoved) => {}) => {
          privateFunctions.onMouseDown = onMouseDown;
        },
        mousemove: (onMouseMove = (position, positionMoved) => {}) => {
          privateFunctions.onMouseMove = onMouseMove;
        },
        mouseup: (onMouseUp = (position, positionMoved) => {}) => {
          privateFunctions.onMouseUp = onMouseUp;
        },
      },
      loaded: (settingPosition = 0) => loaded(settingPosition),
    };
  };

  return {
    Vertical: (positionInit = 0) => DirectionCore(vertical, positionInit),
    Horizontal: (positionInit = 0) => DirectionCore(horizontal, positionInit),
  };
})();

export default {
  Resizeus,
};
