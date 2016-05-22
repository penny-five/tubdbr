<template>
  <div class="track-settings">
    <div class="track-action">
      <div v-if="track.details" transition="fade">
        <track-details
          :details="track.details"
          @clear="onClear">
        </track-details>
      </div>
      <div v-else transition="fade">
        <track-url-editor
          :source="track.source"
          @change="onChangeSource">
        </track-url-editor>
      </div>
    </div>
    <template v-if="track.details">
      <label>viive</label>
      <slider-widget
        :min="0"
        :max="track.details.duration"
        :value="track.delay"
        format="time"
        @change="onChangeDelay">
      </slider-widget>
    </template>
    <label>volyymi</label>
    <slider-widget
      :min="0"
      :max="100"
      :value="track.volume"
      format="number"
      @change="onChangeVolume">
    </slider-widget>
  </div>
</template>

<script>
import TrackUrlEditor from 'components/track-url-editor';
import TrackDetails from 'components/track-details';
import SliderWidget from 'components/slider-widget';

export default {
  props: {
    track: Object
  },
  components: {
    TrackUrlEditor,
    TrackDetails,
    SliderWidget
  },
  methods: {
    onClear() {
      this.$emit('clear');
    },
    onChangeSource(source) {
      this.$emit('change-source', source);
    },
    onChangeVolume(volume) {
      this.$emit('change-volume', volume);
    },
    onChangeDelay(delay) {
      this.$emit('change-delay', delay);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.track-settings {
  position: relative;
  padding-top: $settings-row-height;

  > .track-action {
    top: 0;
    left: 0;
    right: 0;
    height: $settings-row-height;

    > * {
      position: absolute;
      left: 0; right: 0;
    }
  }

  .fade-transition {
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
}
</style>
