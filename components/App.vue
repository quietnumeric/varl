<template>
  <div class="app-1622706149620" :style="cssVars">
    <div ref="containerRef" class="container">
      <Head class="head" />
      <div
        class="content"
        :class="{
          measuring: !ready,
        }"
      >
        <h3 class="column-head">source</h3>
        <div class="resizer-head"></div>
        <h3 class="column-head">format</h3>
        <div class="resizer-head"></div>
        <h3 class="column-head">result</h3>
        <div class="source">
          <DesignableScrollBar
            :mousedown-exclusive-hover="
              mousedownExclusiveHovers.sourceScrollBar
            "
            class="source-scroll-bar"
          >
            <SideTextArea
              :biz="biz.source"
              :mousedown-exclusive-hover="mousedownExclusiveHovers.sourceInput"
              class="source-input"
            />
          </DesignableScrollBar>
        </div>
        <DesignableResizeBar
          class="resizer-left"
          :resizeus="resizeusLeft"
          :enable="resizable"
          :mousedown-exclusive-hover="mousedownExclusiveHovers.resizerLeft"
        />
        <div ref="formatRef" class="format">
          <DesignableScrollBar
            :mousedown-exclusive-hover="
              mousedownExclusiveHovers.formattersScrollBar
            "
            class="formatters-scroll-bar"
          >
            <FormatterList
              :biz="biz.format"
              class="formatters"
              :mousedown-exclusive-hover="mousedownExclusiveHovers.formatters"
            />
          </DesignableScrollBar>
        </div>
        <DesignableResizeBar
          class="resizer-right"
          :resizeus="resizeusRight"
          :enable="resizable"
          :mousedown-exclusive-hover="mousedownExclusiveHovers.resizerRight"
        />
        <div class="result">
          <DesignableScrollBar
            :mousedown-exclusive-hover="
              mousedownExclusiveHovers.resultScrollBar
            "
            class="result-scroll-bar"
          >
            <!--
            :hack-watch-for-slot-updateはかなり歪なハック
            slotを包含するコンポーネントDesignableScrollBarのupdatedライフサイクル
            イベントの発火において妙な判定が行われるため、動くと分かっている方法で強引に突破
            - :biz="biz.result"が持つネストプロパティであるbiz.result.contentは
              ビジネスロジックでPOJOとして更新したい
              - この更新をする時、SideTextAreaをslotとして包含するDesignableScrollBar
                のupdateライフサイクルイベントが発火しない(のは困る)
              - SideTextAreaの呼び出し定義にbiz.result.contentを値とするプロパティが
                定義されていれば(SideTextAreaコンポーネントではpropとして定義すら
                されていなくても)解消される
              - 仮説: slotを包含するコンポーネントはプログラマティックな整合性に関係なく、
                slot内の要素が記述された時点でプロパティとして字面的に列挙されている
                仮想DOMのみをobserveしているのでは？
          -->
            <SideTextArea
              :hack-watch-for-slot-update="biz.result.content"
              :biz="biz.result"
              class="result-input"
              :mousedown-exclusive-hover="mousedownExclusiveHovers.resultInput"
            />
          </DesignableScrollBar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppHead from '~/components/AppHead';
import { App } from '~/libs/biz/biz';
import { BizAppForResizer } from '~/libs/biz/biz-app-for-resizer';
import { Resizeus } from '~/libs/resizeus';
import {
  hoverable,
  mousedownExclusiveHovers,
} from '~/libs/exclusive-hover-cursor';

export default {
  components: {
    Head: AppHead,
  },
  data() {
    return {
      biz: App(),
      bizAppForResizer: BizAppForResizer(this),
      hoverable,
      mousedownExclusiveHovers,
      ready: false,
      resizeusLeft: Resizeus.Vertical(),
      resizeusRight: Resizeus.Vertical(),
      containerMinWidth: 400,
      sideColumnMinWidth: 160,
      resizable: true,
      resizerWidth: 6,
      sourceWidth: 0,
      formatWidth: 0,
      resultWidth: 0,
    };
  },
  computed: {
    cssVars() {
      return {
        '--container-min-width': `${this.containerMinWidth}px`,
        '--source-width': `${this.sourceWidth}px`,
        '--format-width': `${this.formatWidth}px`,
        '--resizer-width': `${this.resizerWidth}px`,
        '--result-width': `${this.resultWidth}px`,
        '--pointer-events-source-scroll-bar': this.pointerEventsByHoverable(
          this.hoverable.sourceScrollBar
        ),
        '--pointer-events-source-input': this.pointerEventsByHoverable(
          this.hoverable.sourceInput
        ),
        '--pointer-events-resizer-left': this.pointerEventsByHoverable(
          this.hoverable.resizerLeft
        ),
        '--pointer-events-formatters-scroll-bar': this.pointerEventsByHoverable(
          this.hoverable.formattersScrollBar
        ),
        '--pointer-events-formatters': this.pointerEventsByHoverable(
          this.hoverable.formatters
        ),
        '--pointer-events-resizer-right': this.pointerEventsByHoverable(
          this.hoverable.resizerRight
        ),
        '--pointer-events-result-scroll-bar': this.pointerEventsByHoverable(
          this.hoverable.resultScrollBar
        ),
        '--pointer-events-result-input': this.pointerEventsByHoverable(
          this.hoverable.resultInput
        ),
        '--pointer-events-others': this.pointerEventsByHoverable(
          this.hoverable.others
        ),
      };
    },
  },
  async mounted() {
    await this.$nextTick();
    this.biz.main.loaded();
    this.bizAppForResizer.mounted();
  },
  methods: {
    pointerEventsByHoverable(hoverableProp, hoverableStyleValue = 'auto') {
      return hoverableProp ? hoverableStyleValue : 'none';
    },
  },
};
</script>
<style lang="scss" scoped>
input[type='text'],
textarea {
  caret-color: #bcaad2;

  &::selection {
    color: #ccc;
    background: #5d2b9f;
  }
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;

  & > li {
    padding: 0;
    margin: 0;
  }
}

$container-bottom: 2rem;
$title-height: 3rem;
$column-head-height: 2rem;
$deps-list-head-height: 2rem;

$this: app-1622706149620;
.#{$this} {
  width: 100vw;
  min-width: var(--container-min-width);
  height: 100vh;
  background: $container-background-color;

  & .container {
    display: grid;
    grid-template-rows: $title-height 1fr;
    width: 80%;
    min-width: var(--container-min-width);
    max-width: 1280px;
    margin: 0 auto;

    & .head {
      pointer-events: var(--pointer-events-others);
    }

    & .content {
      &.measuring {
        grid-template-columns:
          1fr var(--resizer-width) auto var(--resizer-width)
          1fr;
      }

      display: grid;
      grid-template-rows: $column-head-height 1fr;
      grid-template-columns:
        var(--source-width)
        var(--resizer-width)
        var(--format-width)
        var(--resizer-width)
        var(--result-width);
      justify-content: center;
      height: calc(100vh - #{$title-height} - #{$container-bottom});
      min-height: 9.5rem;

      & .column-head {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & .column-head,
      & .resizer-head {
        background: $column-head-background-color;
      }

      & .source,
      & .result,
      & .format {
        overflow: hidden;

        & > * {
          height: 100%;
        }
      }

      $hoverable-content-names: 'source-scroll-bar', 'source-input',
        'resizer-left', 'formatters-scroll-bar', 'formatters', 'resizer-right',
        'result-scroll-bar', 'result-input', 'others';

      @each $content-name in $hoverable-content-names {
        & .#{$content-name} {
          pointer-events: var(--pointer-events-#{$content-name});
        }
      }
    }
  }
}
</style>
