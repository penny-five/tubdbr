<template>
  <div class="track-metadata">
    <img :src="metadata.thumbnail" class="track-metadata__thumbnail"></img>
    <div class="track-metadata__title-wrapper">
      <a :href="createYoutubeLink()" target="_blank" class="track-metadata__title">
        {{ metadata.title }}
      </a>
    </div>
    <button class="track-metadata__clear-btn" @click="onClearClicked">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    metadata: Object
  },
  methods: {
    createYoutubeLink() {
      return `https://www.youtube.com/watch?v=${this.metadata.id}`;
    },
    onClearClicked() {
      this.$emit('clear');
    }
  }
};

</script>

<style lang="scss">
@import "../styles/variables";

$height: $settings-row-height;
$thumbnail-width: $height * (16/9);
$clear-btn-width: $settings-row-control-width;

.track-metadata {
  display: block;

  padding-right: $clear-btn-width + $base-margin;

  .track-metadata__thumbnail {
    width: $thumbnail-width;
    height: $height;

    object-fit: cover;
    border: 1px solid $color-highlight-light;
  }

  .track-metadata__title-wrapper {
    position: absolute;
    top: 0;
    right: $clear-btn-width + $base-margin;
    bottom: 0;
    left: $thumbnail-width + $base-margin;

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
      color: $color-highlight-light;
    }
  }
}

</style>
