<template>
  <div class="app-head-1680166371879">
    <div class="head-left"></div>
    <h1 class="title">varl no you na mono</h1>
    <div class="head-right">
      <UsingTestSourceToggle class="using-test-source-toggle" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
$this: app-head-1680166371879;
.#{$this} {
  display: grid;
  grid-template-columns: 1fr auto 1fr;

  & .head-left,
  & .title,
  & .head-right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  & .head-left {
    justify-content: flex-start;
  }

  & .head-right {
    justify-content: flex-end;
  }
}
</style>
