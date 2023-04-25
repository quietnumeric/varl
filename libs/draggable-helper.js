const doDebug = true;

const debug = (methodName, ...args) => {
  if (!doDebug) return;
  console.log(...[`draggable.${methodName}`, ...args]);
};

/*
  ライフサイクルは
  mousedown して delay が経過:
    - choose
  3pxぐらい外にmousemove:
    - clone
    - start
  mouseup:
    - 以下おそらく非同期
      - unchoose
      - 並べ替えがあった場合
        - updated
        - sort
    - startしていた場合
      - end
  ∴開始～終了はstart/endとchoose/unchooseの二元判定が必要(使い分ける可能性を考えてbooleanも2つがいい)
*/

const handlersDefault = {
  item: {
    mouseenter: (event) => {},
    mousemove: (event) => {},
    mouseleave: (event) => {},
    mousedown: (event) => {},
  },
  list: {
    choose: (event) => {},
    unchoose: (event) => {},
    start: (event) => {},
    end: (event) => {},
    add: (event) => {},
    update: (event) => {},
    sort: (event) => {},
    remove: (event) => {},
    filter: (event) => {},
    move: (event, originalEvent) => {},
    clone: (event) => {},
    change: (event) => {},
  },
};

const classNamesDefault = {
  hover: 'draggable-helper-item-hover',
  active: 'draggable-helper-item-active',
};

export const DraggableHelper = (
  vue,
  isItem = (element) => false,
  { classNames, on } = {
    classNames: classNamesDefault,
    on: handlersDefault,
  }
) => {
  const state = {
    choosing: false,
    dragging: false,
    ended: false,
  };
  const globalFunctions = {
    removeItemMouseUpEventListener: () => {},
  };
  const doing = () => state.choosing || state.dragging;

  const options = {
    classNames: classNames
      ? Object.keys(classNamesDefault).reduce(
          (classNamesAcc, classNameKey) => ({
            ...classNamesAcc,
            [classNameKey]:
              classNames[classNameKey] || classNamesDefault[classNameKey],
          }),
          {}
        )
      : classNamesDefault,
    handlers: on
      ? Object.keys(handlersDefault).reduce(
          (categoriesAcc, categoryKey) => ({
            ...categoriesAcc,
            [categoryKey]: Object.keys(handlersDefault[categoryKey]).reduce(
              (handlersAcc, handlerKey) => ({
                ...handlersAcc,
                [handlerKey]: (() => {
                  const category = on[categoryKey];
                  return category && category[handlerKey]
                    ? category[handlerKey]
                    : handlersDefault[categoryKey][handlerKey];
                })(),
              }),
              {}
            ),
          }),
          {}
        )
      : handlersDefault,
  };

  const { hover, active } = options.classNames;

  const recurse = (element) => {
    if (isItem(element)) return element;
    return recurse(element.parentNode);
  };

  const exclusiveHoverRow = (row) => {
    Array.from(row.parentNode.children)
      .filter((hovered) => hovered.classList.contains(hover))
      .forEach((hovered) => hovered.classList.remove(hover));
    row.classList.add(hover);
  };

  const preMethods = {
    item: {
      mouseenter(event) {
        if (doing()) return;
        if (state.ended) {
          state.ended = false;
          return;
        }
        const row = recurse(event.target);
        exclusiveHoverRow(row);
      },
      mousemove(event) {
        if (doing()) return;
        const row = recurse(event.target);
        if (row.classList.contains(hover)) return;
        exclusiveHoverRow(row);
      },
      mouseleave(event) {
        if (doing()) return;
        const row = recurse(event.target);
        row.classList.remove(hover);
      },
      mousedown(event) {
        const row = recurse(event.target);
        row.classList.remove(hover);
        row.classList.add(active);
        const mouseUpEventListener = () => {
          exclusiveHoverRow(row);
          row.classList.remove(active);
          globalFunctions.removeItemMouseUpEventListener();
        };
        // list.choose の発火(item.mousedown→delay→list.choose)前に
        // リスト外にカーソルが出る場合、document.mouseupが発火
        document.addEventListener('mouseup', mouseUpEventListener);
        // list.choose が発火した後は、document.mouseupが発火しないので
        // list.choose で消す(list.startやlist.endでやってもいいけど)
        // このハンドリングは表(options.handlers)もカバーしたいところではあるものの
        // 事情次第ではカバーすることが邪魔になる可能性もあるのでノータッチ
        globalFunctions.removeItemMouseUpEventListener = () => {
          document.removeEventListener('mouseup', mouseUpEventListener);
        };
      },
    },
    list: {
      // 以下、公式docからのコピペに追記 from https://github.com/SortableJS/Sortable
      // Element is chosen
      choose(event) {
        debug('choose', event);
        state.choosing = true;
        event.item.classList.remove(active);
        globalFunctions.removeItemMouseUpEventListener();
        // event.oldIndex; // element index within parent
      },

      // Element is unchosen
      unchoose(event) {
        debug('unchoose', event);
        state.choosing = false;
        // same properties as onEnd
      },

      // Element dragging started
      start(event) {
        debug('start', event);
        state.dragging = true;
        // event.oldIndex; // element index within parent
      },

      // Element dragging ended
      end(event) {
        debug('end', event);
        state.dragging = false;
        state.ended = true;
        const newIndexItem = event.to.children[event.newIndex];
        exclusiveHoverRow(newIndexItem);

        // const itemEl = event.item; // dragged HTMLElement
        // event.to; // target list
        // event.from; // previous list
        // event.oldIndex; // element's old index within old parent
        // event.newIndex; // element's new index within new parent
        // event.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
        // event.newDraggableIndex; // element's new index within new parent, only counting draggable elements
        // event.clone; // the clone element
        // event.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
      },

      // Element is dropped into the list from another list
      add(event) {
        debug('add', event);
        // same properties as onEnd
      },

      // Changed sorting within list
      update(event) {
        debug('update', event);
        // same properties as onEnd
      },

      // Called by any change to the list (add / update / remove)
      sort(event) {
        debug('sort', event);
        // same properties as onEnd
      },

      // Element is removed from the list into another list
      remove(event) {
        debug('remove', event);
        // same properties as onEnd
      },

      // Attempt to drag a filtered element
      filter(event) {
        debug('filter', event);
        // const itemEl = event.item; // HTMLElement receiving the `mousedown|tapstart` event.
      },

      // Event when you move an item in the list or between lists
      move(event, originalEvent) {
        debug('move', event, originalEvent);
        // Example: https://jsbin.com/nawahef/edit?js,output
        // event.dragged; // dragged HTMLElement
        // event.draggedRect; // DOMRect {left, top, right, bottom}
        // event.related; // HTMLElement on which have guided
        // event.relatedRect; // DOMRect
        // event.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
        // originalEvent.clientY; // mouse position
        // // return false; — for cancel
        // // return -1; — insert before target
        // // return 1; — insert after target
        // // return true; — keep default insertion point based on the direction
        // // return void; — keep default insertion point based on the direction
      },

      // Called when creating a clone of element
      clone(event) {
        debug('clone', event);
        // const origEl = event.item;
        // const cloneEl = event.clone;
      },

      // Called when dragging element changes position
      change(event) {
        debug('change', event);
        // event.newIndex; // most likely why this event is used is to get the dragging element's current index
        // same properties as onEnd
      },
    },
  };

  return {
    list: {
      listeners: {
        choose(event) {
          preMethods.list.choose(event);
          options.handlers.list.choose(event);
        },

        unchoose(event) {
          preMethods.list.unchoose(event);
          options.handlers.list.unchoose(event);
        },

        start(event) {
          preMethods.list.start(event);
          options.handlers.list.start(event);
        },

        end(event) {
          preMethods.list.end(event);
          options.handlers.list.end(event);
        },

        add(event) {
          preMethods.list.add(event);
          options.handlers.list.add(event);
        },

        update(event) {
          preMethods.list.update(event);
          options.handlers.list.update(event);
        },

        sort(event) {
          preMethods.list.sort(event);
          options.handlers.list.sort(event);
        },

        remove(event) {
          preMethods.list.remove(event);
          options.handlers.list.remove(event);
        },

        filter(event) {
          preMethods.list.filter(event);
          options.handlers.list.filter(event);
        },

        move(event, originalEvent) {
          preMethods.list.move(event, originalEvent);
          options.handlers.list.move(event, originalEvent);
        },

        clone(event) {
          preMethods.list.clone(event);
          options.handlers.list.clone(event);
        },

        change(event) {
          preMethods.list.change(event);
          options.handlers.list.change(event);
        },
      },
    },
    item: {
      listeners: {
        mouseenter(event) {
          preMethods.item.mouseenter(event);
          options.handlers.item.mouseenter(event);
        },

        mousemove(event) {
          preMethods.item.mousemove(event);
          options.handlers.item.mousemove(event);
        },

        mouseleave(event) {
          preMethods.item.mouseleave(event);
          options.handlers.item.mouseleave(event);
        },

        mousedown(event) {
          preMethods.item.mousedown(event);
          options.handlers.item.mousedown(event);
        },
      },
    },
  };
};

export default {
  DraggableHelper,
};
