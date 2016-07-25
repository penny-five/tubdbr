<template>
  <div class="track-editor">
    <span class="track-editor__title">{{ title }}</span>
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
          :has-error="track.invalid"
          @change="onChangeSource">
        </track-source-editor>
      </div>
    </div>
    <span class="track-editor__control-title">viive</span>
    <slider-widget
      :disabled="track.metadata == null"
      :min="0"
      :max="track.metadata ? track.metadata.duration : 0"
      :value="track.delay"
      :lazy="true"
      format="duration"
      @change="onChangeDelay">
    </slider-widget>
    <span class="track-editor__control-title">volyymi</span>
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
    title: {
      type: String,
      required: true
    },
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

  border: 1px solid $color-highlight-light;
  margin-bottom: 4*$baseline;
  padding: 2*$baseline;

  .track-editor__title {
    display: inline-block;
    position: relative;
    top: -32px;

    margin: 0;
    padding: 0 10px;

    text-transform: uppercase;

    font-size: 1.1rem;
    font-weight: $font-weight-bold;

    color: $color-text-dark;
    background-color: white;
  }

  .track-editor__control-title {
    display: block;

    margin: 2rem 0 1rem 0;

    font-size: $font-size-small;
    font-weight: $font-weight-normal;
    color: $color-text-dark;
  }

  > .track-editor__action {
    position: relative;
    height: $control-height;

    > * {
      position: absolute;
      left: 0; right: 0;
    }
  }
}
</style>
