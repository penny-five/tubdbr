<template>
  <div>
    <header>
      <div class="container">
        <h1>tubdbr</h1>
        <a class="github-icon" :href="githubURL" :title="githubURL">
          <i class="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
    </header>
    <div class="video-container-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div style="position: relative; overflow: hidden">
              <div v-if="hasVideoAndAudioTrackMetadata" transition="fade-slow">
                <video-player
                  :audio-track="audioTrack"
                  :video-track="videoTrack"
                  @share="toggleShowShareDialog">
                </video-player>
              </div>
              <div v-else transition="fade-slow">
                <video-placeholder></video-placeholder>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" v-if="isShareMode">
        <div class="col-md-12">
          <button type="button" class="btn btn-link center-block" @click="toggleShareMode">Näytä asetukset</button>
        </div>
      </div>
      <div class="row" v-else transition="fade-slow">
        <div class="col-md-6">
          <track-editor
            title="video"
            :track="videoTrack"
            @change-source="partial(updateTrackSource, 'video').apply(this, $arguments)"
            @change-volume="partial(updateTrackVolume, 'video').apply(this, $arguments)"
            @change-delay="partial(updateTrackDelay, 'video').apply(this, $arguments)"
            @clear="partial(clearTrack, 'video').apply(this, $arguments)">
          </track-editor>
        </div>
        <div class="col-md-6">
          <track-editor
            title="audio"
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
    <share-dialog v-if="showShareDialog" :url="url" @close="toggleShowShareDialog"></share-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

import store from 'store/store';
import * as actions from 'store/actions';
import { toURL } from '../utils/state';

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
  data: () => ({
    githubURL: process.env.GITHUB_URL
  }),
  vuex: {
    actions,
    getters: {
      audioTrack: ({ tracks }) => tracks.audio,
      videoTrack: ({ tracks }) => tracks.video,
      showShareDialog: state => state.showShareDialog,
      isShareMode: state => state.shareMode,
      suggestedAudioTracks: state => state.suggestedAudioTracks,
      hasVideoAndAudioTrackMetadata: ({ tracks }) => tracks.audio.metadata && tracks.video.metadata,
      url: state => toURL(window.location, state)
    }
  },
  methods: {
    partial: _.partial
  }
};
</script>

<style lang="scss">
@import "../styles/base";

.github-icon {
  float: right;

  line-height: 40px;
  font-size: 30px;
  color: $color-highlight-dark;

  transition: color .2s ease-in-out;

  &:hover {
    color: $color-primary;
  }
}

.video-container-wrapper {
  margin-bottom: 4*$baseline;

  background-color: $color-background-light;
  border-bottom: 1px solid $color-highlight-light;

  @media screen and (max-width: $screen-sm-min) {
    > .container {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
