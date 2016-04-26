<template>
  <input class="form-control" number v-model="value | clamp min max">
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
}

</script>
