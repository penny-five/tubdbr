<template>
  <div></div>
</template>

<script>
import $ from 'jquery';
import BootstrapSlider from 'bootstrap-slider';

export default {
  props: ['min', 'max'],
  ready: function() {
    $(this.$el).slider({
      min: this.min,
      max: this.max
    });
  }
}
</script>

<style lang="scss">
@import "../styles/colors";

$slider-handle-radius: 13px;
$slider-track-height: 3px;
$slider-border-size: 1px;

.slider {
  margin-top: 20px;

  &.slider-horizontal {
    width: 100%;

    .slider-handle {
      width: $slider-handle-radius*2;
      height: $slider-handle-radius*2;
      margin-top: $slider-handle-radius*-1 + $slider-track-height*.5 - $slider-border-size;
      margin-left: $slider-handle-radius*-1;
      background: white;
      border: $slider-border-size solid $color-highlight-dark;
    }
    .slider-track {
      height: $slider-track-height;
      background: $color-highlight-dark;
      border-radius: 0;
      box-shadow: none;
    }
    .slider-selection {
      background: $color-highlight-light;
      border-radius: 0;
      box-shadow: none;
    }
    > .tooltip {
      bottom: 38px;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;

      > .tooltip-inner {
        background-color: $color-primary;
      }
      > .tooltip-arrow {
        border-top-color: $color-primary;
      }
    }
  }
}
</style>
