<template>
  <div class="track-details">
    <img :src="details.thumbnail" class="track-details__thumbnail"></img>
    <div class="track-details__title-wrapper">
      <a :href="createYoutubeLink()" target="_blank" class="track-details__title">
        {{ details.title }}
      </a>
    </div>
    <button class="track-details__clear-btn" @click="onClearClicked">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    details: Object
  },
  methods: {
    createYoutubeLink() {
      return `https://www.youtube.com/watch?v=${this.details.id}`;
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

.track-details {
  display: block;

  padding-right: $clear-btn-width + $base-margin;

  .track-details__thumbnail {
    width: $thumbnail-width;
    height: $height;

    object-fit: cover;
    border: 1px solid $color-highlight-light;
  }

  .track-details__title-wrapper {
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

  .track-details__title {
    line-height: $height;
  }

  .track-details__clear-btn {
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
