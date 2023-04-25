<template>
  <div class="formatter-list-1678956784478">
    <Draggable
      :list="biz.list.substance"
      class="formatters-substance"
      :animation="500"
      :delay="200"
      @choose="draggable.list.listeners.choose"
      @unchoose="draggable.list.listeners.unchoose"
      @start="draggable.list.listeners.start"
      @end="draggable.list.listeners.end"
      @add="draggable.list.listeners.add"
      @update="draggable.list.listeners.update"
      @sort="draggable.list.listeners.sort"
      @remove="draggable.list.listeners.remove"
      @filter="draggable.list.listeners.filter"
      @move="draggable.list.listeners.move"
      @clone="draggable.list.listeners.clone"
      @change="draggable.list.listeners.change"
    >
      <Item
        v-for="(formatter, index) in biz.list.substance"
        :key="index"
        :formatter="formatter"
        :draggable-item-listeners="draggable.item.listeners"
        :focus="index === focusIndex"
        :click="
          () => {
            // methodsにメソッドを定義してその呼び出しに含めるべきではあるけど
            // 閉じた視野に全部収まっている簡単さを優先
            focusIndex = index;
            biz.item.methods.format(formatter);
          }
        "
        data-is-draggable-item="true"
      />
    </Draggable>
  </div>
</template>
<script>
import Draggable from 'vuedraggable';
import { PropTypes } from '~/libs/prop-types';
import { DraggableHelper } from '~/libs/draggable-helper';
import FormatterListItem from '~/components/FormatterListItem';
import {
  exclusiveHover,
  clearExclusiveCursor,
} from '~/libs/exclusive-hover-cursor';

export default {
  components: {
    Draggable,
    // Draggableを使う時にソート対象要素がDOMじゃなくてVueコンポーネントの場合
    // 自動importに頼ると変なバグに見舞われるので、手動importしないといけない
    // ちなみに変なバグとは「レンダリング後に初めてドラッグソートが実行されようと
    // する時だけ、移動先のindexが0を指す(ドロップ時に、その要素が先頭に並び替わる)」
    Item: FormatterListItem,
  },
  props: {
    biz: PropTypes.obj,
    mousedownExclusiveHover: PropTypes.function,
  },
  data() {
    return {
      draggable: DraggableHelper(
        this,
        (element) => element.dataset.isDraggableItem,
        {
          classNames: {
            hover: 'draggable-helper-item-hover',
            active: 'draggable-helper-item-active',
          },
          on: {
            item: {
              mousedown: (event) => {
                this.mousedownExclusiveHover(event);
              },
            },
            list: {
              start: () => {
                this.focusIndexPre = this.focusIndex;
                this.focusIndex = null;
              },
              end: (event) => {
                // 画一的ではなく個別対応が必要なケース
                exclusiveHover.formatters = false;
                clearExclusiveCursor();
                this.biz.list.methods.saveFormattersOrder();
                const { oldIndex, newIndex } = event;
                const { focusIndexPre } = this;
                this.focusIndex = (() => {
                  if (oldIndex === focusIndexPre) return newIndex;
                  if (oldIndex < focusIndexPre && focusIndexPre <= newIndex)
                    return focusIndexPre - 1;
                  if (newIndex <= focusIndexPre && focusIndexPre < oldIndex)
                    return focusIndexPre + 1;
                  return focusIndexPre;
                })();
              },
            },
          },
        }
      ),
      focusIndex: null,
      focusIndexPre: null,
    };
  },
};
</script>
<style lang="scss" scoped>
$this: formatter-list-1678956784478;
.#{$this} {
  overflow-x: hidden;
  overflow-y: scroll;
  pointer-events: var(--pointer-events);
  // border: 1px solid red;
  // .formatters を display: table; にしたときに高さが stretch される原因は、
  // .formatters の高さが上位gridで1frに指定されて下辺まで引き延ばされることで
  // display: table-row; である要素の高さが強制的に stretch されるため(多分)
  // これは display: table以下; どの層でheightを指定しても効かなかった
  // ので2階層化
  background: $formatters-background-color;

  & .formatters-substance {
    display: table;
    text-align: left;
  }
}
</style>
