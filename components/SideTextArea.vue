<template>
  <textarea
    class="side-text-area-1679473945690"
    spellcheck="false"
    :value="biz.content"
    @input="biz.listeners.input"
    @blur="biz.listeners.blur"
    @mousedown="mousedownExclusiveHover"
  ></textarea>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';

export default {
  props: {
    biz: PropTypes.obj,
    mousedownExclusiveHover: PropTypes.function,
  },
};
</script>
<style lang="scss" scoped>
$this: side-text-area-1679473945690;
.#{$this} {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  overflow: auto;
  color: $side-textarea-text-color;
  overflow-wrap: normal;
  white-space: pre;
  resize: none;
  background: $side-textarea-background-color;
  border: none;
  // border: 1px solid #fff;
}
</style>
