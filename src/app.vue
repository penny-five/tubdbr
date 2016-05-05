<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Video</h2>
          <track-settings
            :source="video.source"
            :volume="video.volume"
            :delay="video.delay"
            @source="setVideoSource"
            @volume="setVideoVolume"
            @delay="setVideoDelay">
          </track-settings>
        </div>
        <div class="col-md-6">
          <h2>Audio</h2>
          <track-settings
            :source="audio.source"
            :volume="audio.volume"
            :delay="audio.delay"
            @source="setAudioSource"
            @volume="setAudioVolume"
            @delay="setAudioDelay">
          </track-settings>
        </div>
      </div>
      <div class="row">
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
      audio: state => state.audio,
      video: state => state.video
    }
  }
};
</script>

<style lang="scss">
@import "./styles/base";
</style>
