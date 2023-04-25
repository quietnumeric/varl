import VueTypes from 'vue-types';

// v2以上と未満で設定方法が違う
// https://dwightjack.github.io/vue-types/

// デフォ値の定義オブジェクトがdefineProperty()による
// アクセッサー上書きの実装に変わったようで、一旦その
// オブジェクトごと代入し直さないといけない(代入し直す
// ことは変だが、開発者が例示してる)
// https://dwightjack.github.io/vue-types/guide/namespaced.html
// v1向け
// VueTypes.sensibleDefaults.bool = false;
// v2+向け
const { sensibleDefaults } = VueTypes;
sensibleDefaults.bool = false;
VueTypes.sensibleDefaults = sensibleDefaults;

export const PropTypes = VueTypes;

export default {
  PropTypes,
};
