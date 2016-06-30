<template>
  <div class="track-editor">
    <div class="track-editor__action">
      <div v-if="track.metadata" transition="fade-fast">
        <track-metadata
          :metadata="track.metadata"
          @clear="onClear">
        </track-metadata>
      </div>
      <div v-else transition="fade-fast">
        <track-source-editor
          :source="track.source"
          :suggestions="suggestions"
          @change="onChangeSource">
        </track-source-editor>
      </div>
    </div>
    <template v-if="track.metadata">
      <label>viive</label>
      <slider-widget
        :min="0"
        :max="track.metadata.duration"
        :value="track.delay"
        :lazy="true"
        format="duration"
        @change="onChangeDelay">
      </slider-widget>
    </template>
    <label>volyymi</label>
    <slider-widget
      :min="0"
      :max="100"
      :value="track.volume"
      :lazy="false"
      format="number"
      @change="onChangeVolume">
    </slider-widget>
  </div>
</template>

<script>
import TrackSourceEditor from 'components/track-source-editor';
import TrackMetadata from 'components/track-metadata';
import SliderWidget from 'components/slider-widget';

export default {
  components: {
    TrackSourceEditor,
    TrackMetadata,
    SliderWidget
  },
  props: {
    track: Object,
    suggestions: {
      type: Array,
      default: () => []
    }
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

.track-editor {
  position: relative;
  padding-top: $control-height;

  > .track-editor__action {
    top: 0;
    left: 0;
    right: 0;
    height: $control-height;

    > * {
      position: absolute;
      left: 0; right: 0;
    }
  }
}
</style>
