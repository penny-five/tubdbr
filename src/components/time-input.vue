<template>
  <input class="form-control" v-model="value | duration" @change.stop>
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
    }
  }
};
</script>
