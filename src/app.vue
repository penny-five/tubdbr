<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Video</h2>
          <track-settings
            :track="videoTrack"
            @change-source="updateVideoTrackSource"
            @change-volume="updateVideoTrackVolume"
            @change-delay="updateVideoTrackDelay"
            @clear="clearVideoTrack">
          </track-settings>
        </div>
        <div class="col-md-6">
          <h2>Audio</h2>
          <track-settings
            :track="audioTrack"
            @change-source="updateAudioTrackSource"
            @change-volume="updateAudioTrackVolume"
            @change-delay="updateAudioTrackDelay"
            @clear="clearAudioTrack">
          </track-settings>
        </div>
      </div>
      <div class="row" v-show="hasVideoAndAudioTrackDetails">
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
import TrackSettings from 'components/track-settings';

export default {
  components: {
    TrackSettings
  },
  store,
  vuex: {
    actions,
    getters: {
      audioTrack: state => state.audioTrack,
      videoTrack: state => state.videoTrack,
      hasVideoAndAudioTrackDetails: state => state.audioTrack.details && state.videoTrack.details
    }
  }
};
</script>

<style lang="scss">
@import "./styles/base";
</style>
