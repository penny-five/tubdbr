<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Video</h2>
          <track-editor
            :track="videoTrack"
            @change-source="partial(updateTrackSource, 'video').apply(this, $arguments)"
            @change-volume="partial(updateTrackVolume, 'video').apply(this, $arguments)"
            @change-delay="partial(updateTrackDelay, 'video').apply(this, $arguments)"
            @clear="partial(clearTrack, 'video').apply(this, $arguments)">
          </track-editor>
        </div>
        <div class="col-md-6">
          <h2>Audio</h2>
          <track-editor
            :track="audioTrack"
            @change-source="partial(updateTrackSource, 'audio').apply(this, $arguments)"
            @change-volume="partial(updateTrackVolume, 'audio').apply(this, $arguments)"
            @change-delay="partial(updateTrackDelay, 'audio').apply(this, $arguments)"
            @clear="partial(clearTrack, 'audio').apply(this, $arguments)">
          </track-editor>
        </div>
      </div>
      <div class="row" v-show="hasVideoAndAudioTrackMetadata">
        <div class="col-md-12">
          <button class="btn center-block">dubstep</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import store from './store/store';
import * as actions from './store/actions';
import TrackEditor from 'components/track-editor';

export default {
  components: {
    TrackEditor
  },
  store,
  vuex: {
    actions,
    getters: {
      audioTrack: ({ tracks }) => tracks.audio,
      videoTrack: ({ tracks }) => tracks.video,
      hasVideoAndAudioTrackMetadata: ({ tracks }) => tracks.audio.metadata && tracks.video.metadata
    }
  },
  methods: {
    partial: _.partial
  }
};
</script>

<style lang="scss">
@import "./styles/base";
</style>
