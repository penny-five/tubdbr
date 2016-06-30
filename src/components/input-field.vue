<template>
  <template v-if="this.format === 'number'">
    <input class="form-control" number v-model="value | clamp min max" @change.stop :lazy="lazy" :readonly="readonly">
  </template>
  <template v-if="this.format === 'duration'">
    <input class="form-control" v-model="value | duration" @change.stop :lazy="lazy" :readonly="readonly">
  </template>
  <template v-if="this.format === 'text'">
    <input class="form-control" v-model="value" @change.stop :lazy="lazy" :readonly="readonly">
  </template>
</template>

<script>
export default {
  props: {
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
