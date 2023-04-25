<template>
  <div
    class="designable-scroll-bar-1625212093168"
    :style="cssVars"
    :class="{
      measuring: !ready,
      // 後でoverflow静的条件と調整
      ['track-is-showing-vertical']: trackIsShowing.vertical,
      // 後でoverflow静的条件と調整
      ['track-is-showing-horizontal']: trackIsShowing.horizontal,
    }"
  >
    <div ref="slotWrapperRef" class="slot-wrapper">
      <slot />
    </div>
    <Track
      ref="verticalTrackRef"
      class="vertical-track"
      :scrollion-direction="scrollion.directions.vertical"
      :mousedown-exclusive-hover="mousedownExclusiveHover"
    />
    <Track
      ref="horizontalTrackRef"
      class="horizontal-track"
      :scrollion-direction="scrollion.directions.horizontal"
      :mousedown-exclusive-hover="mousedownExclusiveHover"
    />
    <div class="corner"></div>
  </div>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';
import { Scrollion } from '~/libs/scrollion';
import DesignableScrollBarTrack from './DesignableScrollBarTrack';

const getStyleProps = (element) => {
  const computedStyle = window.getComputedStyle(element);

  const getStyle = (stylePropName) =>
    computedStyle.getPropertyValue(stylePropName);

  const getStylePropsBySides = (prefix, sides) =>
    sides.reduce(
      (generating, sidePropName) => ({
        ...generating,
        [sidePropName]: getStyle(`${prefix}${sidePropName}`),
      }),
      {}
    );

  const border = getStylePropsBySides('border-', [
    'top',
    'right',
    'bottom',
    'left',
  ]);

  const overflow = getStylePropsBySides('overflow-', ['x', 'y']);

  return {
    border,
    overflow,
  };
};

const overflowDirections = {
  x: 'horizontal',
  y: 'vertical',
};

export default {
  components: {
    Track: DesignableScrollBarTrack,
  },
  props: {
    // trueになる時にinheritSlotStyle()を実行する、親コンポーネントから
    // 子コンポーネントの処理を簡単に呼び出すためのショートカットboolean
    updateSlotStyle: PropTypes.bool,
    styleBarWidthForDebug: PropTypes.string,
    loggable: PropTypes.bool,
    mousedownExclusiveHover: PropTypes.function,
  },
  data() {
    return {
      slotElement: null,
      scrollion: Scrollion(),
      styleBarWidth: this.styleBarWidthForDebug || '18px',
      slotElementStyle: {
        border: {
          top: 'none',
          right: 'none',
          bottom: 'none',
          left: 'none',
        },
        overflow: {
          x: 'auto',
          y: 'auto',
        },
      },
      slotElementOverflow: {
        horizontal: {
          auto: false,
          scroll: false,
          hidden: false,
          visible: false,
        },
        vertical: {
          auto: false,
          scroll: false,
          hidden: false,
          visible: false,
        },
      },
      ready: false,
      styleProps: {},
    };
  },
  computed: {
    trackIsShowing() {
      return {
        vertical: this.trackIsShowingByDirection('vertical'),
        horizontal: this.trackIsShowingByDirection('horizontal'),
      };
    },
    cssVars() {
      return {
        '--vertical-track-width':
          // 後でoverflow静的条件と調整
          this.trackIsShowing.vertical ? this.styleBarWidth : '0',
        '--horizontal-track-width':
          // 後でoverflow静的条件と調整
          this.trackIsShowing.horizontal ? this.styleBarWidth : '0',
        '--track-border-top': this.slotElementStyle.border.top,
        '--track-border-right': this.slotElementStyle.border.right,
        '--track-border-bottom': this.slotElementStyle.border.bottom,
        '--track-border-left': this.slotElementStyle.border.left,
        '--outer-overflow-x': this.slotElementOverflow.horizontal.visible
          ? 'visible'
          : 'hidden',
        '--outer-overflow-y': this.slotElementOverflow.vertical.visible
          ? 'visible'
          : 'hidden',
      };
    },
  },
  watch: {
    updateSlotStyle(value) {
      if (value) this.inheritSlotStyle();
    },
  },
  async mounted() {
    await this.$nextTick();
    const recurse = () => {
      const children = Array.from(this.$refs.slotWrapperRef.children);
      if (children.length === 0) {
        setTimeout(recurse, 0);
        return;
      }
      const slotElement = children[0];
      this.slotElement = slotElement;
      this.inheritSlotStyle();
      // 同期でやってしまうと
      // CSSによるslotコンポーネントのborder消しよりslotサイズ計測が先行するので
      // barの長さ = slotコンポーネントの長さ - 消える前のborder、つまりborder幅分の
      // 落差がtrackとbarにできてしまう
      setTimeout(() => {
        this.scrollion.loaded({
          content: this.slotElement,
          tracks: {
            vertical: this.$refs.verticalTrackRef.$el,
            horizontal: this.$refs.horizontalTrackRef.$el,
          },
        });
      });
      window.addEventListener('resize', (event) => {
        this.scrollion.listeners.window.resize(event);
      });
    };
    recurse();
  },
  async updated() {
    await this.$nextTick();
    setTimeout(() => {
      this.scrollion.mutated();
    });
  },
  methods: {
    log(...obj) {
      if (this.loggable) console.log(...obj);
    },
    trackIsShowingByDirection(direction) {
      return (
        this.slotElementOverflow[direction].scroll ||
        this.scrollion.directions[direction].state.enable
      );
    },
    async inheritSlotStyle() {
      this.ready = false;
      // updateで実行する時にthis.ready由来のclassが確実に外れてくれていないとまずい
      await this.$nextTick();
      const styleProps = getStyleProps(this.slotElement);
      const { border, overflow } = styleProps;

      Object.keys(border).forEach((sidePropName) => {
        this.slotElementStyle.border[sidePropName] = border[sidePropName];
      });

      Object.keys(overflow).forEach((sidePropName) => {
        const sidePropValue = overflow[sidePropName];
        const direction = overflowDirections[sidePropName];
        const overflowDirection = this.slotElementOverflow[direction];
        Object.keys(overflowDirection).forEach((boolPropKey) => {
          overflowDirection[boolPropKey] = boolPropKey === sidePropValue;
        });
      });

      Object.keys(this.scrollion.directions).forEach((direction) => {
        const { options } = this.scrollion.directions[direction];
        const { hidden, visible } = this.slotElementOverflow[direction];
        options.unuse = hidden || visible;
      });
      this.ready = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// 適用要素は overflow:scroll または autoにして ::-webkit-scrollbar は display: none; で消す
// (こうしないで overflow:hidden でやってしまうと、範囲選択で表示エリアの外に出た時や
// マウスホイール操作も受け付けなくなる)
// 実はscopedに守られたり、そうでなくても要素内にだけ効かせることが実はできる
::-webkit-scrollbar {
  display: none;
}

$this: designable-scroll-bar-1625212093168;
.#{$this} {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr var(--horizontal-track-width);
  grid-template-columns: 1fr var(--vertical-track-width);
  overflow-x: var(--outer-overflow-x);
  overflow-y: var(--outer-overflow-y);

  & > .slot-wrapper {
    overflow-x: var(--outer-overflow-x);
    overflow-y: var(--outer-overflow-y);

    // ここを100%にしないと、中身に応じてサイズが変わる要素で
    // client-sizeとscroll-sizeに差が出ない
    & > * {
      width: 100%;
      height: 100%;
    }

    // 非webkit用
    & > * {
      scrollbar-width: none;
    }
  }

  & > .corner {
    background: $scroll-bar-corner-background-color;
  }

  &:not(.measuring) {
    & > .corner {
      border-right: var(--track-border-right);
      border-bottom: var(--track-border-bottom);
    }

    & > .vertical-track {
      border-top: var(--track-border-top);
      border-right: var(--track-border-right);
    }

    @mixin temp-horizontal-track-define() {
      border-right: var(--track-border-right);
    }

    & > .horizontal-track {
      border-bottom: var(--track-border-bottom);
      border-left: var(--track-border-left);
    }

    &.track-is-showing-vertical {
      & > .slot-wrapper > * {
        // slotに渡されるコンポーネントのCSS定義の方がこの*指定より詳細度が高いらしい
        border-right: none !important;
      }

      & > .vertical-track {
        border-bottom: var(--track-border-bottom);
      }
    }

    &.track-is-showing-horizontal {
      & > .slot-wrapper > * {
        // slotに渡されるコンポーネントのCSS定義の方がこの*指定より詳細度が高いらしい
        border-bottom: none !important;
      }

      & > .horizontal-track {
        border-right: var(--track-border-right);
      }
    }

    &.track-is-showing-vertical.track-is-showing-horizontal {
      & > .vertical-track {
        border-bottom: none;
      }

      & > .horizontal-track {
        border-right: none;
      }
    }
  }
}
</style>
