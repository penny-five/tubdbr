<template>
  <div></div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap-slider';

export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      twoWay: true,
      default: 0
    }
  },
  ready: function() {
    $(this.$el).slider({
      min: this.min,
      max: this.max,
      value: this.value
    }).on('change', event => {
      this.value = event.value.newValue;
    });
  },
  watch: {
    min: function(min) {
      $(this.$el).slider('setAttribute', 'min', min);
    },
    max: function(max) {
      $(this.$el).slider('setAttribute', 'max', max);
    },
    value: function(value) {
      $(this.$el).slider('setValue', value);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

$slider-handle-radius: 13px;
$slider-track-height: 3px;
$slider-border-size: 1px;

.slider {

  &.slider-horizontal {
    margin-top: 10px;
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
      font-family: $font-family-sans-serif;
      font-weight: 700;

      transition: opacity 0.2s ease-in-out;

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
