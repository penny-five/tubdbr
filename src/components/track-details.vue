<template>
  <div class="track-details">
    <img :src="thumbnail" class="track-details__thumbnail"></img>
    <div class="track-details__title-wrapper">
      <a :href="createYoutubeLink()" target="_blank" class="track-details__title">{{ title }}</a>
    </div>
    <button class="track-details__clear-btn" @click="onClearClicked">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    id: String,
    title: String,
    channel: String,
    thumbnail: String
  },
  methods: {
    createYoutubeLink: function() {
      return `https://www.youtube.com/watch?v=${this.id}`;
    },
    onClearClicked: function() {
      this.$emit('clear');
    }
  }
};

</script>

<style lang="scss">
@import "../styles/variables";

.track-details {
  display: block;

  padding-right: 60px;

  .track-details__thumbnail {
    width: 34px * (16 / 9);
    height: 34px;

    object-fit: cover;
    border: 1px solid $color-highlight-light;
  }

  .track-details__title-wrapper {
    position: absolute;
    top: 0;
    right: 50px + 10px;
    bottom: 0;
    left: 34px * (16 / 9) + 10px;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    vertical-align: middle;

    color: $color-primary;
  }

  .track-details__title {
    line-height: 34px;
  }

  .track-details__clear-btn {
    position: absolute;
    top: 0;
    right: 0;

    width: 50px;
    height: 34px;

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
