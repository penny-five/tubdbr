<template>
  <div class="track-source-editor">
    <div :class="{ 'form-group': true, 'has-error': hasError }">
      <input
        type="text"
        class="form-control"
        placeholder="videon id tai url-osoite"
        @input.stop="onInput | debounce 500"
        @change.stop
        v-model="source">
    </div>
    <dropdown
      :items="suggestionTitles"
      @select="onSelectSuggestion"
      v-show="hasSuggestions">
    </dropdown>
  </div>
</template>

<script>
import Dropdown from 'components/dropdown';

export default {
  components: {
    Dropdown
  },
  props: {
    source: String,
    suggestions: Array,
    hasError: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    suggestionTitles() {
      return this.suggestions.map(s => s.title);
    },
    hasSuggestions() {
      return this.suggestions.length > 0;
    }
  },
  methods: {
    onInput() {
      this.$emit('change', this.source);
    },
    onSelectSuggestion(index) {
      this.source = this.suggestions[index].id;
      this.$emit('change', this.source);
    }
  }
};
</script>

<style lang="scss">
.track-source-editor {
  position: relative;

  > .form-control {
    padding-right: 50px;
  }

  > .dropdown {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
