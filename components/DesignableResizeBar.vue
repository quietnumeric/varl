<template>
  <div
    class="designable-resize-bar-1678767779138"
    :class="{
      enable,
    }"
    @mousedown="mousedown"
  ></div>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';

export default {
  props: {
    resizeus: PropTypes.obj,
    enable: PropTypes.bool,
    mousedownExclusiveHover: PropTypes.function,
  },
  methods: {
    mousedown(event) {
      if (!this.enable) return;
      this.resizeus.listeners.mousedown(event);
      this.mousedownExclusiveHover(event);
    },
  },
};
</script>
<style lang="scss" scoped>
$this: designable-resize-bar-1678767779138;
.#{$this} {
  cursor: not-allowed;
  background: $resize-bar-background-color;

  &.enable {
    cursor: col-resize;
    transition: background 0.2s ease-out;

    &:hover {
      background: $resize-bar-hover-background-color;
      transition: background 0.3s ease-out;
    }

    &:active {
      animation: flash-resizer 1s linear infinite;
    }

    @keyframes flash-resizer {
      0% {
        background: $resize-bar-flash-phase1-background-color;
      }

      10% {
        background: $resize-bar-flash-phase2-background-color;
      }

      80% {
        background: $resize-bar-flash-phase3-background-color;
      }

      100% {
        background: $resize-bar-flash-phase4-background-color;
      }
    }
  }
}
</style>
