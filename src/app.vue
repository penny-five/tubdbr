<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Video</h2>
          <track-editor
            :track="videoTrack"
            @change-source="updateVideoTrackSource"
            @change-volume="updateVideoTrackVolume"
            @change-delay="updateVideoTrackDelay"
            @clear="clearVideoTrack">
          </track-editor>
        </div>
        <div class="col-md-6">
          <h2>Audio</h2>
          <track-editor
            :track="audioTrack"
            @change-source="updateAudioTrackSource"
            @change-volume="updateAudioTrackVolume"
            @change-delay="updateAudioTrackDelay"
            @clear="clearAudioTrack">
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
      audioTrack: state => state.audioTrack,
      videoTrack: state => state.videoTrack,
      hasVideoAndAudioTrackMetadata: state => state.audioTrack.metadata && state.videoTrack.metadata
    }
  }
};
</script>

<style lang="scss">
@import "./styles/base";
</style>
