const directionKeys = ['vertical', 'horizontal'];

const directionPropsBasis = {
  scrollLength: {
    vertical: 'scrollHeight',
    horizontal: 'scrollWidth',
  },
  clientLength: {
    vertical: 'clientHeight',
    horizontal: 'clientWidth',
  },
  scrollPosition: {
    vertical: 'scrollTop',
    horizontal: 'scrollLeft',
  },
  mousePagePosition: {
    vertical: 'pageY',
    horizontal: 'pageX',
  },
  mouseOffsetPosition: {
    vertical: 'offsetY',
    horizontal: 'offsetX',
  },
};

const mouseDownLongMoveBufferMargin = 10;
const mouseDownLongMoveStartingWaitMs = 100;

const smoothScrollTerms = {
  fast: {
    startingRemainsDistance: null,
    step: 5,
  },
  slow: {
    startingRemainsDistance: 30,
    step: 3,
  },
  stop: {
    startingRemainsDistance: 10,
    step: 1,
  },
};

const toDirectionPropKeys = (directionKey) =>
  Object.keys(directionPropsBasis).reduce(
    (props, key) => ({
      ...props,
      [`${key}Key`]: directionPropsBasis[key][directionKey],
    }),
    {}
  );

export const Scrollion = () => {
  // 都度プロパティ参照で使う(refが渡ってくる前に関数を生成してしまうため)
  const globalDoms = {
    content: null,
  };

  const globalState = {
    loaded: false,
    scrollingByBar: false,
    mousedowningTrack: false,
  };

  const DirectionCore = (directionKey) => {
    const log = (...objects) => {
      console.log(...objects);
    };
    const {
      clientLengthKey,
      scrollLengthKey,
      scrollPositionKey,
      mousePagePositionKey,
      mouseOffsetPositionKey,
    } = toDirectionPropKeys(directionKey);
    const options = {
      unuse: false,
    };
    const directionState = {
      length: 0,
      position: 0,
      enable: false,
      event: {
        active: false,
      },
      track: {
        event: {
          active: false,
        },
      },
      bar: {
        event: {
          active: false,
        },
      },
    };
    const privateState = {
      mouseDownedPosition: 0,
      positionPre: 0,
    };
    // 都度プロパティ参照で使う(refが渡ってくる前に関数を生成してしまうため)
    const doms = {
      track: null,
    };

    const directionStateEvent = directionState.event;
    const directionStateTrackEvent = directionState.track.event;
    const directionStateBarEvent = directionState.bar.event;

    const getTrackRatio = () =>
      globalDoms.content[scrollLengthKey] / doms.track[clientLengthKey];

    const transformBar = () => {
      // mutateはloadが終わるまでに走らないとは限らない
      if (options.unuse || !globalState.loaded) return;
      const clientLength = globalDoms.content[clientLengthKey];
      const scrollLength = globalDoms.content[scrollLengthKey];
      const scrollPosition = globalDoms.content[scrollPositionKey];
      const trackRatio = getTrackRatio();
      directionState.length = clientLength * (clientLength / scrollLength);
      directionState.position = scrollPosition / trackRatio;

      directionState.enable = scrollLength > clientLength;
    };

    // 新しいpositionをスクロールバー開始位置に直接反映させるコア関数
    const reflectNewPosition = (trackRatio, newPosition) => {
      directionState.position = newPosition;
      globalDoms.content[scrollPositionKey] = newPosition * trackRatio;
    };

    const setScrollPosition = (toPosition) => {
      const trackRatio = getTrackRatio();
      reflectNewPosition(trackRatio, toPosition);
    };

    const moveScrollPosition = (toPosition) =>
      new Promise((resolve) => {
        const fromPosition = directionState.position;
        const distance = toPosition - fromPosition;
        if (distance === 0) {
          resolve();
          return;
        }
        const scrollToBottom = distance > 0;
        const trackRatio = getTrackRatio();

        const getUsingTerm = (remainsAbsoluteDistance) =>
          Object.values(smoothScrollTerms).find(
            ({ startingRemainsDistance }) =>
              remainsAbsoluteDistance <= startingRemainsDistance
          ) || smoothScrollTerms.fast;

        // 絶対値で残り距離を扱って、反映の時だけ正負を乗算する方が分かりやすいはず
        const recurse = (remainsAbsoluteDistance) => {
          if (!globalState.mousedowningTrack || remainsAbsoluteDistance <= 0) {
            resolve();
            return;
          }
          const { step } = getUsingTerm(remainsAbsoluteDistance);
          const newAbsoluteDistance = remainsAbsoluteDistance - step;
          const newAbsoluteDistanceFixed =
            newAbsoluteDistance < 0
              ? 0
              : newAbsoluteDistance * (scrollToBottom ? 1 : -1);
          const newPosition = toPosition - newAbsoluteDistanceFixed;
          reflectNewPosition(trackRatio, newPosition);

          // 同期でやると、再帰が全部終わってからrenderされる＝いきなり目的地に飛ぶ動きに
          setTimeout(() => {
            recurse(newAbsoluteDistance);
          }, 0);
        };
        recurse(Math.abs(distance));
      });

    const mouseDownTrack = async (mouseDownEvent) => {
      const mouseOffsetPosition = mouseDownEvent[mouseOffsetPositionKey];
      const trackLength = doms.track[clientLengthKey];
      const { position, length } = directionState;
      const barEndPosition = position + length;

      if (
        position <= mouseOffsetPosition &&
        mouseOffsetPosition <= barEndPosition
      ) {
        return;
      }

      globalState.mousedowningTrack = true;
      directionStateEvent.active = true;
      directionStateTrackEvent.active = true;

      const mouseDown = async () => {
        const topPosition =
          position + (mouseOffsetPosition < position ? -length : length);
        if (topPosition < 0) {
          await moveScrollPosition(0);
          return;
        }
        const endPosition = topPosition + length;
        if (trackLength < endPosition) {
          const newPosition = trackLength - length;
          await moveScrollPosition(newPosition);
          return;
        }
        await moveScrollPosition(topPosition);
      };

      const mouseDownLong = () => {
        // ブラウザの場合は恐らく、mousedown時点でのtrackの上辺からマウス座標までを
        // 一定の除数で割った区間の中での区間topとマウス座標との距離を、この
        // バッファマージンに使っている…が、それを再現してユーザーがうれしいとも思えない
        // のでバッファマージンは固定値として算出するように妥協
        const topPosition = mouseOffsetPosition - mouseDownLongMoveBufferMargin;

        if (topPosition < 0) {
          moveScrollPosition(0);
          return;
        }
        const endPosition = topPosition + length;
        if (trackLength < endPosition) {
          const newPosition = trackLength - length;
          moveScrollPosition(newPosition);
          return;
        }
        moveScrollPosition(topPosition);
      };

      const isMouseOnBar = () => {
        const topPosition = directionState.position;
        const endPosition = topPosition + length;
        return (
          topPosition <= mouseOffsetPosition &&
          mouseOffsetPosition <= endPosition
        );
      };

      await mouseDown();
      setTimeout(() => {
        if (!globalState.mousedowningTrack || isMouseOnBar()) return;
        mouseDownLong();
      }, mouseDownLongMoveStartingWaitMs);

      const mouseMoveEventListener = (mouseMoveEvent) => {
        //
      };

      const mouseUpEventListener = () => {
        document.removeEventListener('mousemove', mouseMoveEventListener);
        document.removeEventListener('mouseup', mouseUpEventListener);
        globalState.mousedowningTrack = false;
        directionStateEvent.active = false;
        directionStateTrackEvent.active = false;
      };
      document.addEventListener('mousemove', mouseMoveEventListener);
      document.addEventListener('mouseup', mouseUpEventListener);
    };

    const mouseDownBar = (mouseDownEvent) => {
      mouseDownEvent.stopPropagation();

      privateState.mouseDownedPosition = mouseDownEvent[mousePagePositionKey];
      privateState.positionPre = directionState.position;
      globalState.scrollingByBar = true;
      directionStateEvent.active = true;
      directionStateBarEvent.active = true;

      const mouseMoveEventListener = (mouseMoveEvent) => {
        const movedPosition =
          mouseMoveEvent[mousePagePositionKey] -
          privateState.mouseDownedPosition;
        const topPosition = privateState.positionPre + movedPosition;
        if (topPosition < 0) {
          setScrollPosition(0);
          return;
        }
        const trackLength = doms.track[clientLengthKey];
        const endPosition = topPosition + directionState.length;
        if (trackLength < endPosition) {
          const newPosition = trackLength - directionState.length;
          setScrollPosition(newPosition);
          return;
        }
        setScrollPosition(topPosition);
      };

      const mouseUpEventListener = () => {
        document.removeEventListener('mousemove', mouseMoveEventListener);
        document.removeEventListener('mouseup', mouseUpEventListener);
        globalState.scrollingByBar = false;
        directionStateEvent.active = false;
        directionStateBarEvent.active = false;
      };
      document.addEventListener('mousemove', mouseMoveEventListener);
      document.addEventListener('mouseup', mouseUpEventListener);
    };

    return {
      key: directionKey,
      doms,
      transformBar,
      options,
      directionState,
      mouseDownTrack,
      mouseDownBar,
    };
  };

  const directions = directionKeys.reduce(
    (generating, directionKey) => ({
      ...generating,
      [directionKey]: DirectionCore(directionKey),
    }),
    {}
  );

  const directionsEach = (eachFunction = (direction, directionKey) => {}) =>
    Object.keys(directions).forEach((directionKey) =>
      eachFunction(directions[directionKey], directionKey)
    );

  const transformBar = () =>
    directionsEach((direction) => direction.transformBar());

  const scroll = (event) => {
    if (globalState.scrollingByBar) return;
    transformBar();
  };

  const loaded = ({
    content,
    tracks = { vertical: null, horizontal: null },
  }) => {
    globalDoms.content = content;
    directionsEach(
      (direction, directionKey) => (direction.doms.track = tracks[directionKey])
    );
    globalState.loaded = true;
    transformBar();
    content.addEventListener('scroll', (event) => {
      scroll(event);
    });
  };

  const mutated = () => {
    transformBar();
  };

  const windowResized = () => {
    transformBar();
  };

  // 戻り値を説明的に列挙するように調整するためだけの関数
  const toReturningDirections = (assigner) =>
    directionKeys.reduce(
      (intermediateDirections, directionKey) => {
        const directionKeyAnother = directionKeys.find(
          (finding) => finding !== directionKey
        );
        const assignedDirection = assigner(
          directionKey,
          directions[directionKey],
          // anotherの参照を渡して、assignerの呼び出し元で代入
          intermediateDirections[directionKeyAnother]
        );
        // シャローコピーでおｋ
        Object.assign(
          intermediateDirections[directionKey],
          assignedDirection[directionKey]
        );
        return intermediateDirections;
      },
      // anotherを先に参照だけ代入できるように先に空のjsoを作る
      directionKeys.reduce(
        (generating, directionKey) => ({
          ...generating,
          [directionKey]: {},
        }),
        {}
      )
    );

  return {
    // 戻り値を説明的に列挙するように調整するためだけの関数
    directions: toReturningDirections(
      (directionKey, direction, anotherReturningDirection) => ({
        [directionKey]: {
          key: direction.key,
          options: direction.options,
          state: direction.directionState,
          listeners: {
            track: {
              mousedown: (event) => direction.mouseDownTrack(event),
            },
            bar: {
              mousedown: (event) => direction.mouseDownBar(event),
            },
          },
          another: anotherReturningDirection,
        },
      })
    ),
    loaded: ({ content, tracks = { vertical: null, horizontal: null } }) =>
      loaded({ content, tracks }),
    mutated: () => mutated(),
    listeners: {
      window: {
        resize: (event) => windowResized(event),
      },
    },
  };
};

export default {
  Scrollion,
};
