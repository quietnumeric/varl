const calcSourceWidthRatio = (sourceWidth, resultWidth) => {
  const sourceWidthRatio = (() => {
    if (sourceWidth === resultWidth) return 0.5;
    if (sourceWidth === 0 && resultWidth > 0) return 0;
    if (sourceWidth > 0 && resultWidth === 0) return 1;
    return sourceWidth / (sourceWidth + resultWidth);
  })();
  return {
    sourceWidthRatio,
    resultWidthRatio: 1 - sourceWidthRatio,
  };
};

const roundForCssNum = (num) => Math.round(num * 1000) / 1000;

export const BizAppForResizer = (vue) => {
  const mounted = () => {
    const { containerRef, formatRef } = vue.$refs;
    const formatterWidthInit = formatRef.offsetWidth;

    // 念のため
    const formatterWidthMin = 60;

    const Resize = (fixedWidth) => () => {
      const sideWidthTotal = containerRef.offsetWidth - fixedWidth;
      const sideWidthEachBase = sideWidthTotal / 2;
      const positionRange = {
        min: vue.sideColumnMinWidth - sideWidthEachBase,
        max:
          containerRef.offsetWidth -
          fixedWidth -
          vue.sideColumnMinWidth -
          sideWidthEachBase,
      };
      const { sourceWidthRatio, resultWidthRatio } = calcSourceWidthRatio(
        vue.sourceWidth,
        vue.resultWidth
      );
      vue.ready = true;
      [
        [
          vue.resizeusLeft,
          vue.resizeusRight,
          sourceWidthRatio,
          (sideWidthInit) => (vue.sourceWidth = sideWidthInit),
          (sideWidthInit) => sideWidthInit - sideWidthEachBase,
        ],
        [
          vue.resizeusRight,
          vue.resizeusLeft,
          resultWidthRatio,
          (sideWidthInit) => (vue.resultWidth = sideWidthInit),
          (sideWidthInit) => sideWidthEachBase - sideWidthInit,
        ],
      ].forEach(
        ([
          resizeusHere,
          resizeusAnother,
          sideWidthRatio,
          setDataSideWidth = (sideWidthInit) => {},
          calcPositionInit = (sideWidthInit) => {},
        ]) => {
          // CSSに合わせて小数第4位以下を四捨五入
          const sideWidthDivided = roundForCssNum(
            sideWidthTotal * sideWidthRatio
          );
          const sideWidthInit = Math.max(
            sideWidthDivided,
            vue.sideColumnMinWidth
          );
          setDataSideWidth(sideWidthInit);
          resizeusHere.setters.position(calcPositionInit(sideWidthInit));
          resizeusHere.setters.rangeGetter(() => positionRange);
          // 今回の適用ケースでは左右が同値ずつ動くので、一方から他方を算出するより
          // 常に左から順番に算出していく方が簡単
          // 地道にやる場合はrightのposition変動によるwidthの計算で正負逆転が必要
          resizeusHere.on.mousemove((position) => {
            const sourceWidth = sideWidthEachBase + position;
            vue.sourceWidth = sourceWidth;
            vue.resultWidth =
              containerRef.offsetWidth - fixedWidth - sourceWidth;
            resizeusAnother.setters.position(position);
          });
        }
      );

      vue.resizable = [vue.sourceWidth, vue.resultWidth].some(
        (sideWidth) => sideWidth !== vue.sideColumnMinWidth
      );
    };

    const recurseWaitFormatRendered = (
      formatterWidthCurrent = formatterWidthInit
    ) => {
      if (
        formatterWidthCurrent <= formatterWidthMin ||
        formatterWidthInit === formatterWidthCurrent
      ) {
        setTimeout(() => {
          recurseWaitFormatRendered(formatRef.offsetWidth);
        }, 0);
        return;
      }
      const { offsetWidth: formatWidth } = formatRef;

      const fixedWidth = formatWidth + vue.resizerWidth * 2;

      vue.containerMinWidth = vue.sideColumnMinWidth * 2 + fixedWidth;
      vue.formatWidth = formatWidth;

      const resize = Resize(fixedWidth);
      resize();
      window.addEventListener('resize', resize);
    };
    recurseWaitFormatRendered();
  };
  return {
    mounted: () => mounted(),
  };
};

export default {
  BizAppForResizer,
};
