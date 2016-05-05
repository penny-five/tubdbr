<template>
  <video-url-combofield :source.sync="source"></video-url-combofield>
  <label>viive</label>
  <slider-with-input :min="0" :max="100" :value.sync="delay"></slider-with-input>
  <label>volyymi</label>
  <slider-with-input :min="0" :max="100" :value.sync="volume"></slider-with-input>
</template>

<script>
import VideoUrlCombofield from 'components/video-url-combofield';
import SliderWithInput from 'components/slider-with-input';

export default {
  props: {
    source: String,
    delay: Number,
    volume: Number
  },
  components: {
    VideoUrlCombofield,
    SliderWithInput
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
