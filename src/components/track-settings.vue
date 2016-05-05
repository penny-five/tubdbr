<template>
  <track-url-editor :source.sync="source"></track-url-editor>
  <label>viive</label>
  <slider-widget :min="0" :max="100" :value.sync="delay"></slider-widget>
  <label>volyymi</label>
  <slider-widget :min="0" :max="100" :value.sync="volume"></slider-widget>
</template>

<script>
import TrackUrlEditor from 'components/track-url-editor';
import SliderWidget from 'components/slider-widget';

export default {
  props: {
    source: String,
    delay: Number,
    volume: Number
  },
  components: {
    TrackUrlEditor,
    SliderWidget
  },
  watch: {
    source: function(source) {
      this.$emit('source', source);
    },
    delay: function(delay) {
      this.$emit('delay', delay);
    },
    volume: function(volume) {
      this.$emit('volume', volume);
    }
  }
};
</script>
