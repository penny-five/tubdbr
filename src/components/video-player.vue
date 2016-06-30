<template>
  <div class="video-player">
    <div class="video-wrapper" v-el:video>
      <div
        data-type="youtube"
        :data-plyr.once="videoTrackOptions | json"
        :data-video-id.once="videoTrackId">
    </div>
    </div>
    <div class="audio-wrapper" v-el:audio>
      <div
        data-type="youtube"
        :data-plyr.once="audioTrackOptions | json"
        :data-video-id.once="audioTrackId">
      </div>
    </div>
  </div>
</template>

<script>
import plyr from 'plyr';

import playerHtml from '../assets/player_controls.html';

export default {
  props: {
    videoTrack: {
      type: Object,
      required: true
    },
    audioTrack: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isVideoPlayerReady: false,
    isAudioPlayerReady: false
  }),
  computed: {
    videoTrackId() {
      return this.videoTrack.metadata.id;
    },
    audioTrackId() {
      return this.audioTrack.metadata.id;
    },
    videoTrackOptions() {
      return {
        html: playerHtml,
        volume: this.videoTrack.volume / 10,
        storage: { enabled: false }
      };
    },
    audioTrackOptions() {
      return {
        controls: [],
        volume: this.audioTrack.volume / 10,
        storage: { enabled: false }
      };
    }
  },
  watch: {
    'videoTrack.volume'(volume) {
      this.getVideoPlayer().setVolume(volume / 10);
    },
    'videoTrack.delay'() {
      this.restartPlayback();
    },
    'audioTrack.volume'(volume) {
      this.getAudioPlayer().setVolume(volume / 10);
    },
    'audioTrack.delay'() {
      this.restartPlayback();
    }
  },
  methods: {
    getAudioPlayer() {
      return this.$els.audio.children[0].plyr;
    },
    getVideoPlayer() {
      return this.$els.video.children[0].plyr;
    },
    restartPlayback() {
      this.getVideoPlayer().seek(this.videoTrack.delay);
      this.getAudioPlayer().seek(this.audioTrack.delay);
      this.getVideoPlayer().play();
      this.getAudioPlayer().play();
    },
    onVideoPlayerReady() {
      this.isVideoPlayerReady = true;
      if (this.isAudioPlayerReady) this.restartPlayback();
    },
    onAudioPlayerReady() {
      this.isAudioPlayerReady = true;
      if (this.isVideoPlayerReady) this.restartPlayback();
    },
    onVideoPlayerPaused() {
      this.getAudioPlayer().pause();
    },
    onVideoPlayerResumed() {
      this.getAudioPlayer().play();
    },
    onVideoPlayerEnded() {
      this.getAudioPlayer().pause();
    },
    onAudioPlayerEnded() {
      this.getAudioPlayer().seek(this.audioTrack.delay);
      this.getAudioPlayer().play();
    },
    onRestartPlayback(event) {
      event.stopPropagation();
      this.restartPlayback();
    },
    onShare(event) {
      event.stopPropagation();
      this.$emit('share');
    }
  },
  ready() {
    plyr.setup([this.$els.video, this.$els.audio]);

    this.$els.video.addEventListener('ready', this.onVideoPlayerReady);
    this.$els.video.addEventListener('pause', this.onVideoPlayerPaused);
    this.$els.video.addEventListener('play', this.onVideoPlayerResumed);
    this.$els.video.addEventListener('restart', this.onRestartPlayback);
    this.$els.video.addEventListener('share', this.onShare);
    this.$els.video.addEventListener('ended', this.onVideoPlayerEnded);
    this.$els.audio.addEventListener('ready', this.onAudioPlayerReady);
    this.$els.audio.addEventListener('ended', this.onAudioPlayerEnded);
  },
  beforeDestroy() {
    this.getVideoPlayer().destroy();
    this.getAudioPlayer().destroy();
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.video-player {

  .audio-wrapper {
    display: none;
  }

  .video-wrapper {
    border: 1px solid $color-highlight-dark;
  }

  .plyr {
    font-family: $font-family-sans-serif;
  }

  .plyr__play-large {
    padding: 12px 42px;

    background-color: $color-complimentary;

    border-radius: 28px;
    border: none;

    box-shadow: 0 1px 5px transparentize(black, 0.5);
    transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;

    > svg {
      display: none;
    }

    > .plyr__play-large__text {
      color: white;
      font-size: $font-size-medium;
      font-weight: $font-weight-bold;
      text-transform: uppercase;
    }

    &:hover {
      background-color: darken($color-complimentary, 8%);
    }
    &:focus {
      outline: none;
    }
  }

  .plyr__spacer {
    display: inline-block;
    flex: 1;
  }

  .plyr__volume--display {
    color: $color-highlight-light;
  }

  .plyr__controls {
    background: linear-gradient(transparent, transparentize(black, 0.7));

    button {
      margin-left: 5px;

      border: 1px solid transparent;

      &:hover {
        background: transparentize($color-primary, 0.25);
      }
      &:focus {
        border: 1px solid $color-primary;
      }
      &:first-of-type {
        margin-left: 0;
      }
    }

    &.plyr__controls--top {
      top: 0;
      bottom: auto;

      padding: 10px 10px 50px;

      flex-direction: row-reverse;

      background: linear-gradient(transparentize(black, 0.7), transparent);
    }
  }

  @media (min-width: 480px) {
    .plyr__controls {
      > button:not(:first-of-type) {
        margin-left: 5px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }

  .plyr__time {
    font-size: $font-size-small;
  }

  .plyr__share {
    margin-right: 5px;
    font-size: $font-size-small;
  }

  .plyr__tooltip {
    padding: $tooltip-padding;

    font-size: $tooltip-font-size;
    font-weight: $tooltip-font-weight;
    background: $color-primary;

    transition: $tooltip-transition;

    &:before {
      bottom: -$tooltip-arrow-size;
      border-top-width: $tooltip-arrow-size;
      border-right-width: $tooltip-arrow-size;
      border-left-width: $tooltip-arrow-size;
      border-top-color: $color-primary;
    }
  }
}
</style>
