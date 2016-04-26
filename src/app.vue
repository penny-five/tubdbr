<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Video</h2>
          <video-setup-box
            :volume="videoVolume"
            :delay="videoDelay"
            @volume="updateVideoVolume"
            @delay="updateVideoDelay">
          </video-setup-box>
        </div>
        <div class="col-md-6">
          <h2>Audio</h2>
          <video-setup-box
            :volume="audioVolume"
            :delay="audioDelay"
            @volume="updateAudioVolume"
            @delay="updateAudioDelay">
          </video-setup-box>
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
import VideoSetupBox from 'components/video-setup-box';

export default {
  components: {
    VideoSetupBox
  },
  store,
  vuex: {
    getters: {
      audioDelay: state => state.audioDelay,
      audioVolume: state => state.audioVolume,
      videoDelay: state => state.videoDelay,
      videoVolume: state => state.videoVolume
    }
  },
  methods: {
    updateVideoVolume(volume) {
      this.$store.dispatch('SET_VIDEO_VOLUME', volume);
    },
    updateVideoDelay(delay) {
      this.$store.dispatch('SET_VIDEO_DELAY', delay);
    },
    updateAudioVolume(volume) {
      this.$store.dispatch('SET_AUDIO_VOLUME', volume);
    },
    updateAudioDelay(delay) {
      this.$store.dispatch('SET_AUDIO_DELAY', delay);
    }
  }
};
</script>

<style lang="scss">
@import "./styles/base";
</style>
