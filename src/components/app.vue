<template>
  <div>
    <h1>tbdbr</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div style="position: relative">
            <div v-if="hasVideoAndAudioTrackMetadata" transition="fade-slow">
              <video-player
                :audio-track="audioTrack"
                :video-track="videoTrack"
                @share="toggleShowSharing">
              </video-player>
            </div>
            <div v-else transition="fade-slow">
              <video-placeholder></video-placeholder>
            </div>
          </div>
        </div>
      </div>
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
            :suggestions="suggestedAudioTracks"
            @change-source="partial(updateTrackSource, 'audio').apply(this, $arguments)"
            @change-volume="partial(updateTrackVolume, 'audio').apply(this, $arguments)"
            @change-delay="partial(updateTrackDelay, 'audio').apply(this, $arguments)"
            @clear="partial(clearTrack, 'audio').apply(this, $arguments)">
          </track-editor>
        </div>
      </div>
    </div>
    <share-dialog v-if="showSharing" :url="url" @close="toggleShowSharing"></share-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

import store from 'store/store';
import * as actions from 'store/actions';
import { createShareableURL } from '../utils';

import VideoPlayer from 'components/video-player';
import VideoPlaceholder from 'components/video-placeholder';
import TrackEditor from 'components/track-editor';
import ShareDialog from 'components/share-dialog';

export default {
  components: {
    VideoPlayer,
    VideoPlaceholder,
    TrackEditor,
    ShareDialog
  },
  store,
  vuex: {
    actions,
    getters: {
      audioTrack: ({ tracks }) => tracks.audio,
      videoTrack: ({ tracks }) => tracks.video,
      showSharing: state => state.showSharing,
      suggestedAudioTracks: state => state.suggestedAudioTracks,
      hasVideoAndAudioTrackMetadata: ({ tracks }) => tracks.audio.metadata && tracks.video.metadata,
      url: ({ tracks }) => createShareableURL(window.location, tracks.video, tracks.audio)
    }
  },
  methods: {
    partial: _.partial
  }
};
</script>

<style lang="scss">
@import "../styles/base";
</style>
