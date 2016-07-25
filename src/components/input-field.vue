<template>
  <template v-if="this.format === 'number'">
    <input class="form-control" number v-model="value | clamp min max" @change.stop :lazy="lazy" :readonly="readonly" :disabled="disabled">
  </template>
  <template v-if="this.format === 'duration'">
    <input class="form-control" v-model="value | duration" @change.stop :lazy="lazy" :readonly="readonly" :disabled="disabled">
  </template>
  <template v-if="this.format === 'text'">
    <input class="form-control" v-model="value" @change.stop :lazy="lazy" :readonly="readonly" :disabled="disabled">
  </template>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    value: {
      default: 0
    },
    format: {
      type: String,
      default: 'number'
    },
    lazy: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
};
</script>
