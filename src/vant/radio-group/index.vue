<template>
  <div :class="b()">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
    @import "../css/radio.scss"
</style>
<script>
import create from '../utils/create';

export default create({
  name: 'radio-group',

  props: {
    value: null,
    disabled: Boolean
  },

  watch: {
    value(value) {
      this.$emit('change', value);
    }
  }
});
</script>
