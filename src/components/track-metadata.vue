<template>
  <div class="track-metadata">
    <img :src="metadata.thumbnail" class="track-metadata__thumbnail"></img>
    <div class="track-metadata__title-wrapper">
      <a :href="link" :title="metadata.title" target="_blank" class="track-metadata__title">
        {{ metadata.title }}
      </a>
    </div>
    <button class="track-metadata__clear-btn" @click="onClearClick">
      <i class="fa fa-remove" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>

const createYoutubeLink = videoId => `https://www.youtube.com/watch?v=${videoId}`;

export default {
  props: {
    metadata: Object
  },
  computed: {
    link() {
      return createYoutubeLink(this.metadata.id);
    }
  },
  methods: {
    onClearClick() {
      this.$emit('clear');
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$height: $control-height;
$thumbnail-width: $height * (16/9);
$clear-btn-width: 40px;

.track-metadata {
  display: block;

  padding-right: $clear-btn-width + $baseline;

  .track-metadata__thumbnail {
    width: $thumbnail-width;
    height: $height;

    object-fit: cover;
    border: 1px solid $color-highlight-light;
  }

  .track-metadata__title-wrapper {
    position: absolute;
    top: 0;
    right: $clear-btn-width + $baseline;
    bottom: 0;
    left: $thumbnail-width + $baseline;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    vertical-align: middle;

    color: $color-primary;
  }

  .track-metadata__title {
    line-height: $height;
  }

  .track-metadata__clear-btn {
    position: absolute;
    top: 0;
    right: 0;

    width: $clear-btn-width;
    height: $height;

    color: $color-highlight-dark;
    border: none;
    outline: none;
    background: none;

    transition: color 0.2s ease-out;

    &:hover {
      color: $color-primary;
    }
  }
}

</style>
