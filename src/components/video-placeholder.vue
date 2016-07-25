<template>
  <div class="video-placeholder">
    <div class="video-placeholder__wrapper">
      <span class="video-placeholder__text">Lisää video- ja ääniraidat</span>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";

.video-placeholder {
  position: relative;

  &:before {
    content: " ";
    display: block;
    padding-top: (9/16) * 100%;
  }

  .video-placeholder__wrapper {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-placeholder__text {
    color: $color-text-light;
    font-size: $font-size-medium;
  }
}
</style>
