<template>
  <div class="track-settings">
    <div class="track-action">
      <div v-if="details" transition="fade">
        <track-details
          :id="details.id"
          :title="details.title"
          :channel="details.channel"
          :thumbnail="details.thumbnail"
          @clear="onClear">
        </track-details>
      </div>
      <div v-else transition="fade">
        <track-url-editor :source.sync="source"></track-url-editor>
      </div>
    </div>
    <template v-if="details">
      <label>viive</label>
      <slider-widget :min="0" :max="details.duration" :value.sync="delay"></slider-widget>
    </template>
    <label>volyymi</label>
    <slider-widget :min="0" :max="100" :value.sync="volume"></slider-widget>
  </div>
</template>

<script>
import TrackUrlEditor from 'components/track-url-editor';
import TrackDetails from 'components/track-details';
import SliderWidget from 'components/slider-widget';

export default {
  props: {
    source: String,
    delay: Number,
    volume: Number,
    details: Object
  },
  components: {
    TrackUrlEditor,
    TrackDetails,
    SliderWidget
  },
  methods: {
    onClear: function() {
      this.$emit('clear');
    }
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

<style lang="scss">
.track-settings {
  position: relative;
  padding-top: 34px;

  > .track-action {
    top: 0;
    left: 0;
    right: 0;
    height: 34px;

    > * {
      position: absolute;
      left: 0; right: 0;
    }
  }

  .fade-enter {
    opacity: 1;
    transition: opacity 0.4s ease;
  }

  .fade-leave {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
}
</style>
