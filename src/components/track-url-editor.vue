<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="videon id tai url-osoite"
      @input.stop="onInput | debounce 500"
      @change.stop
      v-model="source">
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  methods: {
    onInput() {
      this.$emit('change', this.source);
    }
  }
};
</script>
