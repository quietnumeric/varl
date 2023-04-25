<template>
  <div
    class="designable-scroll-bar-track-1678081228601"
    :style="cssVars"
    :class="{
      enable: scrollionDirection.state.enable,
      active: scrollionDirection.state.event.active,
      ['inactive-another']: !scrollionDirection.another.state.event.active,
      [scrollionDirection.key]: true,
    }"
    @mousedown="
      (event) =>
        mousedownWithExclusiveHover(
          event,
          scrollionDirection.listeners.track.mousedown
        )
    "
  >
    <div
      class="bar"
      :class="{
        active: scrollionDirection.state.event.active,
      }"
      @mousedown="
        (event) =>
          mousedownWithExclusiveHover(
            event,
            scrollionDirection.listeners.bar.mousedown
          )
      "
    ></div>
  </div>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';

export default {
  props: {
    scrollionDirection: PropTypes.obj,
    mousedownExclusiveHover: PropTypes.function,
  },
  computed: {
    cssVars() {
      return {
        '--bar-length': `${this.scrollionDirection.state.length}px`,
        '--bar-position': `${this.scrollionDirection.state.position}px`,
      };
    },
  },
  methods: {
    mousedownWithExclusiveHover(event, listener) {
      listener(event);
      this.mousedownExclusiveHover(event);
    },
  },
};
</script>
<style lang="scss" scoped>
$track-border-width: 0;
$transform-scale-bar-shorter: 0.2;
$transform-scale-bar-longer-disabled: 0;
$transform-scale-bar-longer-enabled: 1;

$this: designable-scroll-bar-track-1678081228601;
.#{$this} {
  position: relative;
  background: $scroll-bar-track-background-color;
  border: $track-border-width $scroll-bar-track-border-color solid;

  &.vertical,
  &.horizontal {
    & .bar {
      position: absolute;
      background: $scroll-bar-bar-border-color;
      border: 0 $scroll-bar-bar-border-color solid;
      border-radius: 0;
      transition: ease-outs(0.2s, transform, border-radius, border, background);
    }

    &.enable {
      &.inactive-another:hover,
      &.active {
        & .bar {
          background: $scroll-bar-bar-background-color;
          border-width: 3px;
          border-radius: 1rem;
          transform: scale(1);
        }
      }
    }
  }

  &.vertical {
    height: 100%;

    & .bar {
      top: var(--bar-position);
      height: var(--bar-length);
      // stylelint-disable-next-line order/properties-order
      width: 100%;
      transform: scale(
        $transform-scale-bar-shorter,
        $transform-scale-bar-longer-disabled
      );
      transform-origin: bottom;
    }

    &.enable {
      & .bar {
        transform: scale(
          $transform-scale-bar-shorter,
          $transform-scale-bar-longer-enabled
        );
      }
    }
  }

  &.horizontal {
    width: 100%;

    & .bar {
      left: var(--bar-position);
      width: var(--bar-length);
      // stylelint-disable-next-line order/properties-order
      height: 100%;
      transform: scale(
        $transform-scale-bar-longer-disabled,
        $transform-scale-bar-shorter
      );
      transform-origin: right;
    }

    &.enable {
      & .bar {
        transform: scale(
          $transform-scale-bar-longer-enabled,
          $transform-scale-bar-shorter
        );
      }
    }
  }
}
</style>
