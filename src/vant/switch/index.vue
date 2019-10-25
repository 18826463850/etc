<template>
  <div
    :class="b({
      on: value,
      disabled
    })"
    :style="style"
    @click="onClick"
  >
    <div :class="b('node')">
      <loading v-if="loading" :class="b('loading')" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
    @import "../css/switch.scss";
</style>
<script>
import create from '../utils/create';

export default create({
  name: 'switch',

  props: {
    value: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      default: '30px'
    }
  },

  computed: {
    style() {
      return {
        fontSize: this.size
      };
    }
  },

  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        this.$emit('input', !this.value);
        this.$emit('change', !this.value);
      }
    }
  }
});
</script>
