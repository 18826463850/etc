<template>
  <div :class="b()">
    <div :class="b('toolbar')" class="van-hairline--top-bottom" v-if="showToolbar">
      <slot>
        <div :class="b('cancel')" @click="emit('cancel')">{{ cancelButtonText || $t('cancel') }}</div>
        <div :class="b('title')" class="van-ellipsis" v-if="title" v-text="title" />
        <div :class="b('confirm')" @click="emit('confirm')">{{ confirmButtonText || $t('confirm') }}</div>
      </slot>
    </div>
    <div v-if="loading" :class="b('loading')">
      <loading />
    </div>
    <div :class="b('columns')" :style="columnsStyle" @touchmove.prevent>
      <picker-column
        v-for="(item, index) in (simple ? [columns] : columns)"
        :key="index"
        :value-key="valueKey"
        :initial-options="simple ? item : item.values"
        :class-name="item.className"
        :default-index="defaultIndex"
        :item-height="itemHeight"
        :visible-item-count="visibleItemCount"
        @change="onChange(index)"
      />
      <div :class="b('frame')" class="van-hairline--top-bottom" :style="frameStyle" />
    </div>
  </div>
</template>

<style lang="scss">
  @import "../css/picker.scss";
</style>
<script>
import create from '../utils/create';
import PickerColumn from './PickerColumn';
import deepClone from '../utils/deep-clone';

export default create({
  name: 'picker',

  components: {
    PickerColumn
  },

  props: {
    title: String,
    loading: Boolean,
    showToolbar: Boolean,
    confirmButtonText: String,
    cancelButtonText: String,
    visibleItemCount: {
      type: Number,
      default: 5
    },
    valueKey: {
      type: String,
      default: 'text'
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    columns: {
      type: Array,
      default: () => []
    },

    defaultIndex:{
      type: Number,
      default: 0
    }

    
  },

  data() {
    return {
      children: []
    };
  },

  computed: {
    frameStyle() {
      return {
        height: this.itemHeight + 'px'
      };
    },

    columnsStyle() {
      return {
        height: this.itemHeight * this.visibleItemCount + 'px'
      };
    },

    simple() {
      return this.columns.length && !this.columns[0].values;
    }
  },

  watch: {
    columns() {
      this.setColumns();
    }
  },

  methods: {
    setColumns() {
      const columns = this.simple ? [{ values: this.columns }] : this.columns;
      columns.forEach((columns, index) => {
        this.setColumnValues(index, deepClone(columns.values));
      });
    },

    emit(event) {
 
      if (this.simple) {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit(event, this.getValues(), this.getIndexes());
      }
    },

    onChange(columnIndex) {
      if (this.simple) {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit('change', this, this.getValues(), columnIndex);
      }
    },

    // get column instance by index
    getColumn(index) {
      return this.children[index];
    },

    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },

    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      column && column.setValue(value);
    },

    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },

    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);
      column && column.setIndex(optionIndex);
    },

    // get options of column by index
    getColumnValues(index) {
      return (this.children[index] || {}).options;
    },

    // set options of column by index
    setColumnValues(index, options) {
      const column = this.children[index];
      if (column && JSON.stringify(column.options) !== JSON.stringify(options)) {
        column.options = options;
        column.setIndex(0);
      }
    },

    // get values of all columns
    getValues() {
      return this.children.map(child => child.getValue());
    },

    // set values of all columns
    setValues(values) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value);
      });
    },

    // get indexes of all columns
    getIndexes() {
      return this.children.map(child => child.currentIndex);
    },

    // set indexes of all columns
    setIndexes(indexes) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex);
      });
    }
  }
});
</script>
