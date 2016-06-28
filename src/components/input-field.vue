<template>
  <template v-if="this.format === 'number'">
    <input class="form-control" number v-model="value | clamp min max" @change.stop :lazy="lazy">
  </template>
  <template v-if="this.format === 'duration'">
    <input class="form-control" v-model="value | duration" @change.stop :lazy="lazy">
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
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'number'
    },
    lazy: {
      type: Boolean,
      default: false
    }
  }
};
</script>
