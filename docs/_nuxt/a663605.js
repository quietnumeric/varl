(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,n){"use strict";n.d(t,"c",(function(){return h})),n.d(t,"b",(function(){return k})),n.d(t,"d",(function(){return O})),n.d(t,"a",(function(){return w}));n(22),n(29),n(47),n(48);var r=n(18);n(30);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={sourceScrollBar:!0,sourceInput:!0,resizerLeft:!0,formattersScrollBar:!0,formatters:!0,resizerRight:!0,resultScrollBar:!0,resultInput:!0,usingTestSource:!0,others:!0},f=Object.keys(l),v=f.reduce((function(e,t){return Object.defineProperty(e,t,{get:function(){},set:function(e){f.forEach((function(n){var r=!e||n===t;l[n]=r}))}}),e}),{}),d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";document.body.parentElement.style.cursor=e},y=function(e){var t=window.getComputedStyle(e.target).getPropertyValue("cursor");d(t)},m=f.reduce((function(e,t){return c(c({},e),{},Object(r.a)({},t,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{once:!0};v[t]=!0,e&&y(e);var r=function(){v[t]=!1,e&&d()};document.addEventListener("mouseup",r,n)})))}),{}),h=l,k=v,O=m,w=function(){return d()}},175:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(79);var o=n(107);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},178:function(e,t,n){"use strict";var r=n(3),o=n(84)(5),c="find",l=!0;c in[]&&Array(1).find((function(){l=!1})),r(r.P+r.F*l,"Array",{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),n(83)(c)},187:function(e,t,n){var content=n(199);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(64).default)("0112da8c",content,!0,{sourceMap:!1})},191:function(e,t,n){"use strict";n.d(t,"a",(function(){return se})),n.d(t,"b",(function(){return le}));var r=n(175),o=(n(178),n(29),n(31),n(115),function(e){var t=function(){return JSON.parse(window.localStorage.getItem(e)||"{}")};return{get:function(e){return t()[e]},put:function(n,r){var o=t();o[n]=r,function(t){window.localStorage.setItem(e,JSON.stringify(t))}(o)},clear:function(){return window.localStorage.removeItem(e)}}}),c="\nconst str = '文字列';\nconst num = 123;\nconst bool = true;\nconst position = before = after;\nconst equals = 'a = b';\nconst ts: type = 'value';\nconst includes ^= 333;\nconst greater >= 333;\nconst smaller <= 333;\nstring = '\"クォート組み合わせおかしい'\";\n'string' = 'シングルクォート';\n\"string\" = 'ダブルクォート';\n'\"multi-quote\"' = 'シングルダブルクォート';\n\"'multi-quote'\" = 'ダブルシングルクォート';\npl_sql_var VARCHAR (100) := 'tekisuto';\nstr: '文字列',\nnum: 123,\nbool: true,\nposition: before = after,\nequals: 'a = b',\n[camelKey]: 'camelKey',\n[snake_key]: 'snake_key',\n['kebab-key']: 'kebab-key',\n'string': 'クォート';\n\"'multi-quote'\": 'マルチクォート';\nyamlKey: yamlVal\ncss-color-code: #1Ab;\ncss-color-code: #1Ab; #aaa;\n'値だけ';\n# こめ\n// こめ\n<--! こめ\nconst riceEarly21 = 21;\nconst riceEarly21 = 21; // こめ\nconst riceEarly21 = 21; /* こぬ\nconst riceEarly21 = 21; # こぬ\nconst riceEarly21 = 21; <--! こぬ\nconst riceEarly = '#こめあり';\nconst riceEarly = '//こめあり';\nconst riceEarly = '<こめあり';\nconst riceEarly = '#こめあり# こめ'; # こめ'\nconst riceEarly = '//こめあり// こめ'; // こめ\nconst riceEarly = '<こめあり<--! こめ'; <--! こめ\nconst riceEarly = '#こめあり'; # こめ'\nconst riceEarly = '//こめあり'; // こめ' // こめ'\nconst riceEarly = '<こめあり'; <--! こめ'\n".trim(),l=("\nconst str = '文字列';\nconst num = 123;\nconst bool = true;\nconst position = before = after;\nconst equals = 'a = b';\nconst ts: type = 'value';\nconst includes ^= 333;\nconst greater >= 333;\nconst smaller <= 333;\nstring = '\"クォート組み合わせおかし\n'string' = 'シングルクォート';\n\"string\" = 'ダブルクォート';\n'\"multi-quote\"' = 'シングルダブルク\n\"'multi-quote'\" = 'ダブルシングルク\npl_sql_var VARCHAR (100) := 'tekisutoa\nstr: '文字列',\nnum: 123,\nbool: true,\nconst riceEarly21 = 21;\nconst riceEarly21 = 21; // こめ\nconst riceEarly21 = 21; /* こぬ\nconst riceEarly21 = 21; # こぬ\nconst riceEarly21 = 21; <--!\nconst riceEarly = '#こめあり';\nconst riceEarly = '//こめあり';\nconst riceEarly = '<こめあり';\nconst riceEarly = '#こめあり#\nconst riceEarly = '//こめあり//\nconst riceEarly = '<こめあり<--!\nconst riceEarly = '#こめあり'; #\nconst riceEarly = '//こめあり'; /\nconst riceEarly = '<こめあり'; <-\n".trim(),c),f=n(9),v=(n(85),n(30),window.location.search.substring(1)),d={};v&&v.split("&").forEach((function(e){var t=e.split("="),n=Object(f.a)(t,2),r=n[0],o=n[1];d[r]=o}));var y=function(){return function(e){var t={};for(var n in window.history.state)t[n]=window.history.state[n];window.history.replaceState(t,"",e?"?".concat(e):"")}(Object.keys(d).map((function(e){return"".concat(e,"=").concat(d[e])})).join("&"))},m={put:function(e,t){d[e]=t,y()},get:function(e){return d[e]},remove:function(e){delete d[e],y()}},h=(n(22),n(47),n(48),n(18));n(118),n(49),n(40);function k(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(t){Object(h.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var w,j,E=/^ *[/#<]/,P=/(^[^'"`]+:[^'"`]+)=(.+$)/,S=/(^[^'"`=:^]+):=(.+$)/,x=/(^[^=:^><]+)[=:^><]+(.+$)/,C=function(e,t,n){var o=function(e,t){var n=e.match(t);if(!n)return null;var r=Object(f.a)(n,3),o=(r[0],r[1]),c=r[2];return[o.trim(),c.trim()]}(e,t);return o?n.apply(void 0,Object(r.a)(o)):null},F=function(e){return function(source){var t=source,n={},r=Object.keys(e).reduce((function(o,c){return O(O({},o),{},Object(h.a)({},c,(function(){var o,l=e[c];return t="function"==typeof l?l(t,n):(o=l,t.replace(o.before,o.after||"")),r})))}),{done:function(){return{part:t,options:n}}});return r}},A=F({typeScriptType:{before:/:.+$/},plSqlType:{before:/ .+$/},generalDeclaration:{before:/^[^ ]+ /},enclosers:{before:/^[`"'[]+([^"']+)[`"'\]]+$/,after:"$1"}}),_=F({general:function(e,t){var n=e.match(/^(['"`])/);if(n){var r=n[1];t.quote=r;var o=e.slice(1),c=o.indexOf(r);return c<0?e:o.slice(0,c)}var l=e.match(/^(#[0-9a-zA-Z]+);/);return l?l[1]:e.replace(/[//|/*|#|<-].+/,"").replace(/ *[;,] *$/,"")}}),T=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{varPart:e,valPart:t,options:n}},V=function(e,t){return T(e.part,t.part,t.options)},D={typeScript:function(e){return C(e,P,(function(e,t){return V(A(e).typeScriptType().generalDeclaration().enclosers().done(),_(t).general().done())}))},plSql:function(e){return C(e,S,(function(e,t){return V(A(e).plSqlType().enclosers().done(),_(t).general().done())}))},general:function(e){return C(e,x,(function(e,t){return V(A(e).enclosers().generalDeclaration().done(),_(t).general().done())}))}},I=function(e){return T("",_(e).general().done().part)},R=Object.keys(D),$=function(e){return e.trim().split("\n").filter((function(source){return source&&!source.match(E)})).map((function(e){var t,source=e.trim(),n=(t=source,function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=D[R[n]];return r?r(t)||e(n+1):I(t)}());return{varPart:n.varPart,valPart:n.valPart,options:n.options}}))},L=function(){var e=function(e,t){return e.charAt(0)[t]()+e.slice(1)},t=function(t){return function(t){return e(t,"toLowerCase")}(t.replace(/^[-_]/,"")).replace(/[-_](.)/g,(function(e,t){return t.toUpperCase()}))},n=function(e,symbol){return t(e).replace(/[A-Z]/g,(function(e){return symbol+e.charAt(0).toLowerCase()}))};return{kebab:function(e){return n(e,"-")},snake:function(e){return n(e,"_")},camel:t,pascal:function(n){return function(t){return e(t,"toUpperCase")}(t(n))}}}(),Q=L.kebab,z=L.snake,B=L.camel,U=L.pascal,H=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){return t.map((function(t){return t(e)}))}},J=function(e,label){return{type:"func",label:label,trimLabel:!0,varFind:["PascalCase","camelCase"],varFunc:H(U,B)}},K=function(symbol){return{type:"vue",label:"".concat(symbol,'kebab-case="camelCase"'),varFind:["kebab-case","camelCase"],varFunc:H(Q,B)}},M=[{type:"js",label:"const var = val;"},{type:"js",label:"let var = val;"},{type:"js",label:"var: val,"},{type:"js",label:"val: 'val',",forceQuote:!0},{type:"js",label:"camelCase: val,",varFind:"camelCase",varFunc:B},{type:"js",label:"camelCase: 'val',",forceQuote:!0,varFind:"camelCase",varFunc:B},{type:"js",label:"val,"},{type:"json",label:'"var": "val",',forceQuote:!0},{type:"yaml",label:"var: val",forceQuote:!0},{type:"yaml",label:"- val",forceQuote:!0},{type:"html",label:'kebab-case="val"',forceQuote:!0,varFind:"kebab-case",varFunc:Q},{type:"vue",label:':kebab-case="val"',forceQuote:!0,varFind:"kebab-case",varFunc:Q},K("@"),K(":"),{type:"css",label:"kebab-case: val;",forceQuote:!0,varFind:"kebab-case",varFunc:Q},{type:"sql",label:"snake_case: val;",varFind:"snake_case",varFunc:z},J(0,"\nconst setPascalCase = (camelCase) => {\n\n};"),J(0,"\nconst getPascalCase = () => {\n  return camelCase;\n};"),J(0,"\nconst onPascalCase = (camelCase) => {\n\n};")],N=(n(117),function(e){var t=e.varPart,n=e.valPart;return"".concat(t||"").concat(t&&n?" ":"").concat(n||"")}),Z="<<<<<",G=">>>>>",W=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map((function(e){return"".concat(Z).concat(e).concat(G)}))},X=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map((function(e){return new RegExp("".concat(Z).concat(e).concat(G),"g")}))},Y=function(e,t){var n=function(e){return e?(label=e.label,t=e.trimLabel,n=e.varFind,o=e.valFind,c=e.varFunc,l=e.valFunc,f=e.forceQuote,v=n?Array.isArray(n)?n:[n]:["var"],d=o||"val",y=W.apply(void 0,Object(r.a)(v)),m=W(d)[0],h=X.apply(void 0,Object(r.a)(v)),k=X(d)[0],O=t?label.trim():label,w=v.reduce((function(e,t,n){return e.replace(new RegExp(t,"g"),y[n])}),O).replace(new RegExp(d,"g"),m),function(e){var t=e.varPart,n=e.valPart,r=e.options,o=c?c(t):t,v=Array.isArray(o)?o:[o],d=l?l(n):n,y=f?d:(r.quote||"")+d+(r.quote||"");return h.reduce((function(e,t,n){return e.replace(t,v[n])}),w).replace(k,y)}):N;var label,t,n,o,c,l,f,v,d,y,m,h,k,O,w}(t);return e.map(n).join("\n")},ee=(w=o("varl"),j="formatter-labels",{save:function(e){return w.put(j,e)},load:function(){return w.get(j)}}),te={sourceVarValLines:[],currentFormatter:null,sourceContentUserInputted:""},ne=function(){return Y(te.sourceVarValLines,te.currentFormatter)},re=function(e,label){return M.find((function(e){return e.label===label}))},ae=function(){var e=ee.load();if(!e)return M;var t=e.map((function(label){var e=re(0,label);return e?(e.picked=!0,e):null})).filter((function(e){return e})),n=M.filter((function(e){return!e.picked}));return[].concat(Object(r.a)(t),Object(r.a)(n))}(),oe=function(source){te.sourceVarValLines=$(source),ue.content=source,te.currentFormatter&&(ie.content=ne())},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{input:function(){},blur:function(){}};return{content:"",listeners:e}},ue=ce({input:function(e){oe(e.target.value)},blur:function(e){var t=e.target.value.trim().split("\n").map((function(line){return line.trim()})).join("\n");oe(t)}}),ie=ce(),se=function(){return{main:{loaded:function(e){oe(ue.content)}},source:ue,result:ie,format:{list:{substance:ae,methods:{saveFormattersOrder:function(){var e=ae.map((function(e){return e.label}));ee.save(e)}}},item:{methods:{format:function(e){te.currentFormatter=re(0,e.label),ie.content=ne()}}}}}},le=function(){var e="using-test-source",t={checked:!1},n=function(){te.sourceContentUserInputted=ue.content};return{state:t,loaded:function(){"true"===m.get(e)&&(t.checked=!0,n(),oe(l))},listeners:{change:function(r){return function(r){var o=r.target.checked;t.checked=o,o&&n();var source=o?l:te.sourceContentUserInputted;oe(source),m.put(e,o)}(r)}}}}},193:function(e,t,n){"use strict";n.r(t);var r=n(4),o=(n(36),n(191)),c=n(167),l={data:function(){return{biz:Object(o.b)(),hoverable:c.c}},computed:{cssVars:function(){return{"--pointer-events-using-test-source":this.pointerEventsByHoverable(this.hoverable.usingTestSource)}}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$nextTick();case 2:e.biz.loaded();case 3:case"end":return t.stop()}}),t)})))()},methods:{mousedown:function(e){c.d.usingTestSource(e)},pointerEventsByHoverable:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"auto";return e?t:"none"}}},f=(n(198),n(28)),component=Object(f.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"using-test-source-toggle-1680244033899",style:e.cssVars},[n("input",{attrs:{id:"usingTestSourceToggle",type:"checkbox"},domProps:{checked:e.biz.state.checked},on:{change:e.biz.listeners.change}}),e._v(" "),n("label",{attrs:{for:"usingTestSourceToggle"},on:{mousedown:e.mousedown}},[n("span",{staticClass:"check-mark"}),n("span",{staticClass:"text"},[e._v("using test source")])])])}),[],!1,null,"12374a0c",null);t.default=component.exports},198:function(e,t,n){"use strict";n(187)},199:function(e,t,n){var r=n(63)(!1);r.push([e.i,'.using-test-source-toggle-1680244033899[data-v-12374a0c]{pointer-events:var(--pointer-events-using-test-source)}.using-test-source-toggle-1680244033899 label[data-v-12374a0c]{padding:.5rem 1rem;cursor:pointer;background:#2c2c2f;border-radius:.3rem;transition:background .2s ease-out}.using-test-source-toggle-1680244033899 label .text[data-v-12374a0c]{color:#777}.using-test-source-toggle-1680244033899 label[data-v-12374a0c]:hover{background:#383940;transition:background .3s ease-out}.using-test-source-toggle-1680244033899 label:active .text[data-v-12374a0c]{color:transparent;text-shadow:0 1px #777}.using-test-source-toggle-1680244033899 label .check-mark[data-v-12374a0c]{position:relative;display:inline-block;width:1rem;height:1rem;margin-right:.25rem}.using-test-source-toggle-1680244033899 label .check-mark[data-v-12374a0c]:before{position:absolute;right:.35rem;bottom:.2rem;display:block;width:.9rem;height:.5rem;content:"";border-color:#444249;border-style:solid;border-width:0 0 3px 3px;transition:border .2s ease-out;transform:rotate(-45deg)}.using-test-source-toggle-1680244033899 input[type=checkbox]:checked+label[data-v-12374a0c]{background:#383940}.using-test-source-toggle-1680244033899 input[type=checkbox]:checked+label .text[data-v-12374a0c]{color:#eee}.using-test-source-toggle-1680244033899 input[type=checkbox]:checked+label[data-v-12374a0c]:hover{background:#4d4f58;transition:background .3s ease-out}.using-test-source-toggle-1680244033899 input[type=checkbox]:checked+label:active .text[data-v-12374a0c]{color:transparent;text-shadow:0 1px #eee}.using-test-source-toggle-1680244033899 input[type=checkbox]:checked+label .check-mark[data-v-12374a0c]:before{border-color:#827b8e;-webkit-animation:activate-check-mark-data-v-12374a0c .5s linear;animation:activate-check-mark-data-v-12374a0c .5s linear}@-webkit-keyframes activate-check-mark-data-v-12374a0c{0%{border-color:#444249}30%{border-color:#cab6ec}to{border-color:#827b8e}}@keyframes activate-check-mark-data-v-12374a0c{0%{border-color:#444249}30%{border-color:#cab6ec}to{border-color:#827b8e}}',""]),e.exports=r}}]);