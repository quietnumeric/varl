<template>
  <div class="using-test-source-toggle-1680244033899" :style="cssVars">
    <input
      id="usingTestSourceToggle"
      type="checkbox"
      :checked="biz.state.checked"
      @change="biz.listeners.change"
    />
    <label for="usingTestSourceToggle" @mousedown="mousedown">
      <span class="check-mark"></span
      ><span class="text">using test source</span>
    </label>
  </div>
</template>
<script>
import { UsingTestSourceToggle } from '~/libs/biz/biz';
import {
  hoverable,
  mousedownExclusiveHovers,
} from '~/libs/exclusive-hover-cursor';

export default {
  data() {
    return {
      biz: UsingTestSourceToggle(),
      hoverable,
    };
  },
  computed: {
    cssVars() {
      return {
        '--pointer-events-using-test-source': this.pointerEventsByHoverable(
          this.hoverable.usingTestSource
        ),
      };
    },
  },
  async mounted() {
    await this.$nextTick();
    this.biz.loaded();
  },
  methods: {
    mousedown(event) {
      mousedownExclusiveHovers.usingTestSource(event);
    },
    pointerEventsByHoverable(hoverableProp, hoverableStyleValue = 'auto') {
      return hoverableProp ? hoverableStyleValue : 'none';
    },
  },
};
</script>
<style lang="scss" scoped>
$this: using-test-source-toggle-1680244033899;
.#{$this} {
  pointer-events: var(--pointer-events-using-test-source);

  & label {
    padding: 0.5rem 1rem;
    cursor: pointer;
    background: $using-test-source-toggle-background-color;
    border-radius: 0.3rem;
    transition: background 0.2s ease-out;

    & .text {
      color: $using-test-source-toggle-text-color;
    }

    &:hover {
      background: $using-test-source-toggle-hover-background-color;
      transition: background 0.3s ease-out;
    }

    &:active {
      & .text {
        color: transparent;
        text-shadow: 0 1px $using-test-source-toggle-text-color;
      }
    }

    & .check-mark {
      position: relative;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      $check-mark-border-width: 3px;

      margin-right: 0.25rem;

      &::before {
        position: absolute;
        right: 0.35rem;
        bottom: 0.2rem;
        display: block;
        width: 0.9rem;
        height: 0.5rem;
        content: '';
        border: solid 0 $using-test-source-toggle-check-mark-border-color;
        border-bottom-width: $check-mark-border-width;
        border-left-width: $check-mark-border-width;
        transition: border 0.2s ease-out;
        transform: rotate(-45deg);
      }
    }
  }

  & input[type='checkbox']:checked + label {
    background: $using-test-source-toggle-checked-background-color;

    & .text {
      color: $using-test-source-toggle-checked-text-color;
    }

    &:hover {
      background: $using-test-source-toggle-checked-hover-background-color;
      transition: background 0.3s ease-out;
    }

    &:active {
      & .text {
        color: transparent;
        text-shadow: 0 1px $using-test-source-toggle-checked-text-color;
      }
    }

    & .check-mark {
      &::before {
        border-color: $using-test-source-toggle-checked-check-mark-border-color;
        animation: activate-check-mark 0.5s linear;

        @keyframes activate-check-mark {
          0% {
            border-color: $using-test-source-toggle-check-mark-border-color;
          }

          30% {
            border-color: $using-test-source-toggle-checked-activating-check-mark-border-color;
          }

          100% {
            border-color: $using-test-source-toggle-checked-check-mark-border-color;
          }
        }
      }
    }
  }
}
</style>
