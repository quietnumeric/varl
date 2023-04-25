<template>
  <div
    class="formatter-list-item-1679451127975"
    :class="{
      focus,
    }"
    @click="click"
    @mouseenter="draggableItemListeners.mouseenter"
    @mousemove="draggableItemListeners.mousemove"
    @mouseleave="draggableItemListeners.mouseleave"
    @mousedown="draggableItemListeners.mousedown"
  >
    <div class="type-col">
      <span class="type">
        {{ formatter.type }}
      </span>
    </div>
    <div class="label-col">
      <span class="label">{{
        formatter.trimLabel ? formatter.label.trim() : formatter.label
      }}</span>
    </div>
  </div>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';

export default {
  props: {
    formatter: PropTypes.obj,
    draggableItemListeners: PropTypes.obj,
    focus: PropTypes.bool,
    click: PropTypes.function,
  },
};
</script>
<style lang="scss" scoped>
$this: formatter-list-item-1679451127975;
.#{$this} {
  display: table-row;
  cursor: pointer;
  background: $formatter-background-color;
  transition: background 0.2s ease-out;
  &.focus {
    background: $formatter-active-background-color;
  }

  & > .type-col,
  & > .label-col {
    display: table-cell;
  }

  & > .type-col {
    padding: 0.5rem 0.25rem 0.5rem 0.5rem;
    // しない方がスマートに見える
    // vertical-align: middle;

    & .type {
      position: relative;
      padding: 0.1rem 0.5rem;
      background: $formatter-type-background-color;
      border-radius: 1rem;
    }
  }

  & > .label-col {
    padding: 0.5rem 0.5rem 0.5rem 0.25rem;

    & .label {
      white-space: pre;
    }
  }

  @include draggable-helper-item-hover() {
    background: $formatter-hover-background-color;
    transition: background 0.1s ease-out;
  }

  @include draggable-helper-item-active() {
    background: $formatter-active-background-color;
    transition: background 0s ease-out;

    & .type {
      background: $formatter-active-type-background-color;
    }
  }

  @include draggable-helper-item-dragging() {
    background: $formatter-dragging-background-color;
    transition: background 0.2s ease-out;
    animation: pull-up 0.1s linear forwards;

    & .type {
      background: $formatter-dragging-type-background-color;
    }

    @keyframes pull-up {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(0.95);
      }

      100% {
        transform: scale(1.02);
      }
    }
  }

  @include draggable-helper-item-ghost() {
    opacity: 0.3;
  }
}
</style>
