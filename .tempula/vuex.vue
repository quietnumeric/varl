<template>
  <div class="@file-name@-@timestamp@"></div>
</template>
<script>
import { PropTypes } from '~/libs/prop-types';

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
$this: @file-name@-@timestamp@;
.#{$this} {
  // 空で置いておきたい場合はコメントを挟む(でないとstylelintエラー)
}
</style>
